from aiokafka import AIOKafkaConsumer
import json
import asyncio
import logging

# Kafka configuration (env-driven in prod)
KAFKA_BOOTSTRAP_SERVERS = "localhost:9092"
TRANSACTION_TOPIC = "kubera.payments.raw"
GROUP_ID = "kubera-ingest-service"

logger = logging.getLogger("kubera.ingest")

async def consume_transactions():
    """
    Async Kafka consumer for transaction feeds.
    Validates payloads and routes to the persistence layer.
    """
    consumer = AIOKafkaConsumer(
        TRANSACTION_TOPIC,
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        group_id=GROUP_ID,
        value_deserializer=lambda m: json.loads(m.decode('utf-8'))
    )

    await consumer.start()
    logger.info(f"Ingestion pipeline active: Consuming from {TRANSACTION_TOPIC}")

    try:
        async for msg in consumer:
            tx_data = msg.value
            tenant_id = tx_data.get("tenant_id")
            
            # 1. Validation Logic
            if not tenant_id:
                logger.error("Drop Record: Missing tenant affinity")
                continue
                
            # 2. Schema Normalization
            # (In reality, we would call a service to write to Postgres/Neo4j)
            logger.debug(f"INGEST | Tenant: {tenant_id} | TX: {tx_data.get('id')} | Amount: {tx_data.get('amount')}")
            
            # 3. ACK/Proceed
            # await persist_transaction(tx_data)
            
    finally:
        await consumer.stop()

if __name__ == "__main__":
    asyncio.run(consume_transactions())
