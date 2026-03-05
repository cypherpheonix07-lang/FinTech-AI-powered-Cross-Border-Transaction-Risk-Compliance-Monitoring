"""
Decentralized Autonomous Organizations (DAOs)
Handles governance proposals, token-weighted voting, and automated treasury execution.
"""
from typing import Dict, Any, List
import datetime

class DAOGovernance:
    """
    Simulates a smart contract-based governance system for community-run protocols.
    """
    def __init__(self):
        self.active_proposals = {
            "PROP_2026_04": {
                "title": "Allocate $5M to DeFi Lending Liquidity Pool",
                "proposer": "0x4A...2B",
                "status": "ACTIVE_VOTING",
                "yes_votes": 4500000.0,
                "no_votes": 1200000.0,
                "abstain_votes": 50000.0,
                "quorum_required": 10000000.0,
                "deadline": (datetime.datetime.now() + datetime.timedelta(days=2)).isoformat(),
                "execution_payload": {"type": "TREASURY_TRANSFER", "amount": 5000000.0, "destination": "Lending_Smart_Contract"}
            },
            "PROP_2026_05": {
                "title": "Upgrade Core Consensus Protocol (v4.1)",
                "proposer": "Core_Dev_Team",
                "status": "QUEUED_FOR_EXECUTION",
                "yes_votes": 18500000.0,
                "no_votes": 400000.0,
                "abstain_votes": 1000000.0,
                "quorum_required": 15000000.0,
                "deadline": (datetime.datetime.now() - datetime.timedelta(days=1)).isoformat(),
                "execution_payload": {"type": "CONTRACT_UPGRADE", "version": "v4.1"}
            }
        }

    def cast_vote(self, proposal_id: str, voter_address: str, vote_weight: float, vote_type: str) -> Dict[str, Any]:
        """
        Simulates casting a token-weighted vote on an active proposal.
        """
        if proposal_id not in self.active_proposals:
             return {"status": "ERROR", "reason": "Proposal ID not found."}
             
        prop = self.active_proposals[proposal_id]
        
        if prop["status"] != "ACTIVE_VOTING":
             return {"status": "ERROR", "reason": f"Voting is closed. Current status: {prop['status']}"}
             
        if vote_type not in ["YES", "NO", "ABSTAIN"]:
             return {"status": "ERROR", "reason": "Invalid vote type. Must be YES, NO, or ABSTAIN."}

        # Simulate adding the vote weight
        if vote_type == "YES":
             prop["yes_votes"] += vote_weight
        elif vote_type == "NO":
             prop["no_votes"] += vote_weight
        else:
             prop["abstain_votes"] += vote_weight
             
        total_votes = prop["yes_votes"] + prop["no_votes"] + prop["abstain_votes"]
        quorum_met = total_votes >= prop["quorum_required"]
        
        return {
            "proposal_id": proposal_id,
            "voter": voter_address,
            "vote_cast": vote_type,
            "voting_power_used": vote_weight,
            "current_standings": {
                "yes": prop["yes_votes"],
                "no": prop["no_votes"],
                "abstain": prop["abstain_votes"]
            },
            "quorum_status": "MET" if quorum_met else f"PENDING ({round((total_votes/prop['quorum_required'])*100, 1)}%)",
            "timestamp": datetime.datetime.now().isoformat()
        }

    def check_proposal_execution(self, proposal_id: str) -> Dict[str, Any]:
        """
        If a proposal deadline has passed and quorum met, changes status to Queued or Executed.
        """
        if proposal_id not in self.active_proposals:
             return {"status": "ERROR", "reason": "Proposal ID not found."}
             
        prop = self.active_proposals[proposal_id]
        deadline = datetime.datetime.fromisoformat(prop["deadline"])
        
        total_votes = prop["yes_votes"] + prop["no_votes"] + prop["abstain_votes"]
        quorum_met = total_votes >= prop["quorum_required"]
        passed = prop["yes_votes"] > prop["no_votes"]
        
        if datetime.datetime.now() > deadline:
            if not quorum_met:
                 prop["status"] = "REJECTED_QUORUM_NOT_MET"
            elif not passed:
                 prop["status"] = "REJECTED_BY_VOTERS"
            elif prop["status"] == "QUEUED_FOR_EXECUTION":
                 prop["status"] = "EXECUTED_ON_CHAIN"
            else:
                 prop["status"] = "QUEUED_FOR_EXECUTION"
                 
        return {
             "proposal_id": proposal_id,
             "status": prop["status"],
             "quorum_met": quorum_met,
             "passed": passed,
             "action": "Triggering payload" if prop["status"] == "EXECUTED_ON_CHAIN" else "Awaiting Time-lock" if prop["status"] == "QUEUED_FOR_EXECUTION" else "None"
        }

# For testing
if __name__ == "__main__":
    dao = DAOGovernance()
    
    print("Voting on Liquidity Proposal:")
    vote = dao.cast_vote("PROP_2026_04", "0xG5...H9", 5000000.0, "YES")
    print(vote)
    
    print("\nChecking Execution Status of Completed Proposal:")
    execution = dao.check_proposal_execution("PROP_2026_05")
    print(execution)
