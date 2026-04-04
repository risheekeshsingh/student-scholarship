const cron = require('node-cron');
const Alert = require('../models/Alert');
const { sendEmail } = require('./emailService');

/**
 * Initializes all background cron jobs for the application.
 */
const startScheduler = () => {

  // Schedule task to run every day at exactly 09:00 AM
  // cron syntax: 'Minute Hour Day Month DayOfWeek' -> '0 9 * * *'
  cron.schedule('0 9 * * *', async () => {
    console.log('⏰ Running daily deadline alert check (9 AM)...');
    
    try {
      const currentTime = new Date();
      const withinSevenDays = new Date();
      withinSevenDays.setDate(currentTime.getDate() + 7); // Remind users 7 days ahead

      const expiringAlerts = await Alert.find({
        notified: false,
        deadline: {
          $gte: currentTime,
          $lte: withinSevenDays
        }
      });

      if (expiringAlerts.length === 0) {
        console.log('ℹ️ No user alerts pending for upcoming deadlines.');
        return;
      }

      console.log(`⚠️ Delivering ${expiringAlerts.length} personalized deadline alerts!`);

      for (const alert of expiringAlerts) {
        const message = `🔔 Action Required: Scholarship Deadline Alert!
        
Hello! 

This is a personalized reminder that the deadline for "${alert.scholarshipName}" (ID: ${alert.scholarshipId}) is approaching rapidly. 
It formally expires on: ${new Date(alert.deadline).toLocaleDateString()}

Please ensure your application is submitted securely through the EduGrant portal before the deadline.

Best,
EduGrant Advisory Team`;
        
        const success = await sendEmail(alert.email, message);

        // Mark as notified if email sent securely
        if (success) {
          alert.notified = true;
          await alert.save();
        }
      }
      
    } catch (error) {
      console.error('❌ Error during scheduled deadline check:', error.message);
    }
  });

  console.log('✅ Node-Cron Scheduler initialized (Checking daily at 9:00 AM).');
};

module.exports = {
  startScheduler
};
