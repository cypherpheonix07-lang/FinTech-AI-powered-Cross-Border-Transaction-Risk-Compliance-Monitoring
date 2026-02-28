import sys
import os
import json
import uuid
import logging

# Ensure backend modules can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from backend.api_gateway.rate_limiter import RateLimiter
from backend.services.counterfactuals import CounterfactualService
from backend.privacy.consent_manager import ConsentManager
from backend.reports.scheduler import ReportScheduler

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - [WORKFLOW] - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)

class WorkflowSimulator:
    """
    Simulates coherent business processes to ensure components work together.
    """
    
    @staticmethod
    def simulate_investigation_workflow():
        case_id = f"CASE_{uuid.uuid4().hex[:8]}"
        analyst = "agent_smith"
        tx_id = "TX_9982_X"
        tenant = "GLOBAL_BANK_ALPHA"
        
        logging.info(f"--- Starting Investigation Workflow: {case_id} ---")
        
        # Step 1: Check API Limits
        logging.info("[1] Checking API Limits...")
        limiter = RateLimiter()
        allowed, _ = limiter.is_allowed(tenant)
        if not allowed:
            logging.error("Process Halted: Rate Limit Exceeded")
            return
            
        # Step 2: Check Data Access Consent
        logging.info("[2] Verifying GDPR Consent...")
        # Simulate prior consent
        # user_id, tenant_id, scope
        ConsentManager.record_consent("subject_01", tenant, "INVESTIGATION")
        has_consent = ConsentManager.check_consent("subject_01", "INVESTIGATION")
        if not has_consent:
             logging.error("Process Halted: Privacy Violation")
             return
             
        # Step 3: Run AI Analysis
        logging.info("[3] Running Counterfactual Analysis...")
        risk_profile = CounterfactualService.get_suggestions(tx_id, 0.92)
        logging.info(f"    Target Risk Reduction: {risk_profile['current_risk']} -> {risk_profile['estimated_new_risk']}")
        
        # Step 4: Schedule Executive Report
        logging.info("[4] Scheduling Outcome Report...")
        schedule_id = f"SCHED_{case_id}"
        # Mocking the scheduler's internal dict for simulation
        ReportScheduler._schedules[schedule_id] = {
            "recipients": ["compliance@bank.com"],
            "frequency": "ONCE",
            "last_run": None
        }
        report_url = ReportScheduler.trigger_run(schedule_id)
        
        if report_url:
            logging.info(f"    Report Delivered: {report_url}")
        else:
            logging.error("    Report Generation Failed")

        logging.info(f"--- Workflow {case_id} Completed Successfully ---\n")

if __name__ == "__main__":
    WorkflowSimulator.simulate_investigation_workflow()
