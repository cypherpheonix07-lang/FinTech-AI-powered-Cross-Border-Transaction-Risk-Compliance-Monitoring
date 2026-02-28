/**
 * KafkaSimulator.js
 * Client-side utility to simulate high-velocity streaming events in dev.
 */
export const kafkaSimulator = {
  active: false,
  
  start: (onEvent) => {
    kafkaSimulator.active = true;
    console.log("⚡ Kafka Simulation Engine Active...");
    
    const stream = () => {
      if (!kafkaSimulator.active) return;
      
      const mockEvent = {
        tx_id: `TX_${Math.floor(Math.random()*100000)}`,
        amount: (Math.random()*50000).toFixed(2),
        currency: 'USD',
        timestamp: new Date().toISOString(),
        risk_score: +(Math.random().toFixed(2))
      };
      
      onEvent(mockEvent);
      setTimeout(stream, Math.random() * 2000 + 500);
    };
    
    stream();
  },

  stop: () => {
    kafkaSimulator.active = false;
    console.log("🛑 Kafka Simulation Stopped.");
  }
};

export default kafkaSimulator;
