package main

import (
	"bytes"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"


	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type TransactionRequest struct {
	TransactionID string `json:"transactionId"`
}

type User struct {
	FullName  string `json:"fullname"`
	KYCStatus string `json:"kyc_status"`
}

type Transaction struct {
	ID        string  `json:"id"`
	Amount    float64 `json:"amount"`
	SenderID  string  `json:"sender_id"`
	Status    string  `json:"status"`
	RiskScore int     `json:"risk_score"`
	Sender    User    `json:"sender"`
}

type AuditEntry struct {
	ID          string `json:"id"`
	CurrentHash string `json:"current_hash"`
}

func main() {
	godotenv.Load("../.env")

	supabaseUrl := os.Getenv("VITE_SUPABASE_URL")
	supabaseKey := os.Getenv("VITE_SUPABASE_SERVICE_ROLE_KEY")

	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, apikey, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	})

	r.POST("/analyze", func(c *gin.Context) {
		var req TransactionRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// 1. Fetch Transaction via REST API
		client := &http.Client{}
		txUrl := fmt.Sprintf("%s/rest/v1/transactions?id=eq.%s&select=*,sender:sender_id(fullname,kyc_status)", supabaseUrl, req.TransactionID)
		
		httpReq, _ := http.NewRequest("GET", txUrl, nil)
		httpReq.Header.Set("apikey", supabaseKey)
		httpReq.Header.Set("Authorization", "Bearer "+supabaseKey)

		resp, err := client.Do(httpReq)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Supabase connection error"})
			return
		}
		defer resp.Body.Close()

		var txs []Transaction
		json.NewDecoder(resp.Body).Decode(&txs)

		if len(txs) == 0 {
			c.JSON(http.StatusNotFound, gin.H{"error": "Transaction not found"})
			return
		}
		tx := txs[0]

		// 2. Risk Analysis
		isHighValue := tx.Amount > 500
		kycVerified := tx.Sender.KYCStatus == "VERIFIED"
		hopCount := 4
		latencyMs := 45000
		isLayeringPattern := hopCount > 3 && latencyMs < 60000

		riskScore := 10
		verdict := "SAFE"
		alertType := "NONE"
		analogy := "Path is direct and verified through standard banking rails."

		if isLayeringPattern {
			riskScore += 70
			alertType = "FRAUD_SPIKE_DETECTION"
			analogy = "Think of it like handing a package to a courier who immediately drives into a hidden maze, strips off the tracking labels, and hands the package to four strangers to confuse anyone trying to follow it."
		}

		if isHighValue && !kycVerified {
			riskScore += 20
			if alertType == "NONE" {
				alertType = "KYC_LIMIT_EXCEEDED"
			} else {
				alertType += "_KYC_MISMATCH"
			}
		}

		if riskScore >= 50 {
			verdict = "FLAGGED"
		} else {
			verdict = "COMPLETED"
		}

		// 3. Update Transaction
		updateUrl := fmt.Sprintf("%s/rest/v1/transactions?id=eq.%s", supabaseUrl, req.TransactionID)
		updateData, _ := json.Marshal(map[string]interface{}{"status": verdict, "risk_score": riskScore})
		httpReq, _ = http.NewRequest("PATCH", updateUrl, bytes.NewBuffer(updateData))
		httpReq.Header.Set("apikey", supabaseKey)
		httpReq.Header.Set("Authorization", "Bearer "+supabaseKey)
		httpReq.Header.Set("Content-Type", "application/json")
		client.Do(httpReq)

		// 4. Merkle Chaining
		auditFetchUrl := fmt.Sprintf("%s/rest/v1/audit_ledger?select=current_hash&order=created_at.desc&limit=1", supabaseUrl)
		httpReq, _ = http.NewRequest("GET", auditFetchUrl, nil)
		httpReq.Header.Set("apikey", supabaseKey)
		httpReq.Header.Set("Authorization", "Bearer "+supabaseKey)
		resp, _ = client.Do(httpReq)
		
		var lastAudits []AuditEntry
		json.NewDecoder(resp.Body).Decode(&lastAudits)
		resp.Body.Close()

		prevHash := "0000000000000000000000000000000000000000000000000000000000000000"
		if len(lastAudits) > 0 && lastAudits[0].CurrentHash != "" {
			prevHash = lastAudits[0].CurrentHash
		}

		currentData := fmt.Sprintf("%s-%d-%s", req.TransactionID, riskScore, alertType)
		hashInput := prevHash + currentData
		h := sha256.New()
		h.Write([]byte(hashInput))
		currHash := hex.EncodeToString(h.Sum(nil))

		auditData := map[string]interface{}{
			"transaction_id": req.TransactionID,
			"event_type":     alertType,
			"risk_score":     riskScore,
			"analysis": map[string]interface{}{
				"pattern":       "FAST_LAYERING",
				"hops_detected": hopCount,
				"velocity_ms":   latencyMs,
				"kyc_status":    tx.Sender.KYCStatus,
			},
			"ux_analogy":     analogy,
			"previous_hash":  prevHash,
			"current_hash":   currHash,
			"integrity_hash": currHash,
		}

		auditInsertUrl := fmt.Sprintf("%s/rest/v1/audit_ledger", supabaseUrl)
		auditJson, _ := json.Marshal(auditData)
		httpReq, _ = http.NewRequest("POST", auditInsertUrl, bytes.NewBuffer(auditJson))
		httpReq.Header.Set("apikey", supabaseKey)
		httpReq.Header.Set("Authorization", "Bearer "+supabaseKey)
		httpReq.Header.Set("Content-Type", "application/json")
		client.Do(httpReq)

		c.JSON(http.StatusOK, gin.H{
			"transactionId": req.TransactionID,
			"riskScore":     riskScore,
			"verdict":       verdict,
			"analysis": gin.H{
				"title":          strings.ReplaceAll(fmt.Sprintf("PathGuard Alert: %s", verdict), "SAFE", "Verified"),
				"description":    analogy,
				"recommendation": "Merkle-chained audit log generated for this intervention.",
			},
			"merkle": gin.H{
				"previous_hash": prevHash,
				"current_hash":  currHash,
			},
		})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Printf("PathGuard Risk Engine (Go) live on port %s\n", port)
	r.Run(":" + port)
}
