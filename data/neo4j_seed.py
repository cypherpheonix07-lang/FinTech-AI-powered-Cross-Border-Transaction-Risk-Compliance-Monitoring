from neo4j import GraphDatabase
from faker import Faker
import random
import os

URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
USER = os.getenv("NEO4J_USER", "neo4j")
PASSWORD = os.getenv("NEO4J_PASSWORD", "test")

fake = Faker()
driver = GraphDatabase.driver(URI, auth=(USER, PASSWORD))

def seed(tx):
    print("Seeding accounts...")
    # create some accounts and shared identifiers to form rings
    for i in range(1, 201):
        acc_num = f"100{i:04}"
        tx.run("MERGE (a:Account {accountNumber:$acc}) SET a.name=$name", acc=acc_num, name=fake.name())

    print("Seeding shared identifiers...")
    # create identifiers shared among groups
    for gid in range(1, 41):
        # each gid shared by 3-6 accounts
        identifier = f"phone_group_{gid}"
        tx.run("MERGE (id:Identifier {value:$idv, type:'phone'})", idv=identifier)
        members = random.sample(range(1, 201), random.randint(3, 6))
        for m in members:
            acc = f"100{m:04}"
            tx.run("""
                MATCH (a:Account {accountNumber:$acc}), (id:Identifier {value:$idv})
                MERGE (a)-[:HAS_IDENTIFIER]->(id)
            """, acc=acc, idv=identifier)

    print("Seeding circular transfer rings...")
    # create some explicit rings A -> B -> C -> A
    for ring_id in range(1, 11):
        # 3 accounts per ring
        accs = [f"100{random.randint(1, 200):04}" for _ in range(3)]
        for i in range(len(accs)):
            sender = accs[i]
            receiver = accs[(i + 1) % len(accs)]
            tx.run("""
                MATCH (s:Account {accountNumber:$sAcc}), (r:Account {accountNumber:$rAcc})
                MERGE (s)-[:SENT {amount: $amt, currency: 'USD'}]->(r)
            """, sAcc=sender, rAcc=receiver, amt=random.randint(1000, 5000))

try:
    with driver.session() as session:
        session.execute_write(seed)
    print("Neo4j seed complete")
except Exception as e:
    print(f"Error seeding Neo4j: {e}")
finally:
    driver.close()
