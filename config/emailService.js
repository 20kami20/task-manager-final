import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

export const sendWelcomeEmail = async (email, username) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to Task Manager!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">Welcome to Task Manager!</h1>
          <p>Hi ${username},</p>
          <p>Thank you for registering with Task Manager. We're excited to have you on board!</p>
          <p>You can now:</p>
          <ul>
            <li>Create and manage your tasks</li>
            <li>Set priorities and due dates</li>
            <li>Track your progress</li>
            <li>Stay organized and productive</li>
          </ul>
          <p>Get started by logging in and creating your first task!</p>
          <p>Best regards,<br>The Task Manager Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

export const sendTaskReminderEmail = async (email, username, task) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Task Reminder: ${task.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">Task Reminder</h1>
          <p>Hi ${username},</p>
          <p>This is a reminder about your upcoming task:</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h2 style="margin-top: 0;">${task.title}</h2>
            <p><strong>Description:</strong> ${task.description || 'No description'}</p>
            <p><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Status:</strong> ${task.status}</p>
          </div>
          <p>Don't forget to complete this task on time!</p>
          <p>Best regards,<br>The Task Manager Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Task reminder sent to ${email}`);
  } catch (error) {
    console.error('Error sending task reminder:', error);
    throw error;
  }
};