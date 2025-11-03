// app/api/contact/route.js
import nodemailer from 'nodemailer';

// Create SMTP transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      serviceType,
      budget,
      timeline,
      message,
    } = body;

    // Validation
    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const transporter = createTransporter();

    // Verify SMTP connection
    try {
      await transporter.verify();
    } catch (error) {
      console.error('SMTP verification failed:', error);
      return Response.json(
        { success: false, error: 'Email service unavailable' },
        { status: 500 }
      );
    }

    // Format date
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Email to admin
    const adminMailOptions = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `🚀 New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%); padding: 30px 20px; border-radius: 10px 10px 0 0; color: white; }
              .header h1 { margin: 0; font-size: 24px; }
              .header p { margin: 5px 0 0 0; opacity: 0.9; }
              .content { background: #f9fafb; padding: 30px 20px; }
              .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
              .info-item { background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #a855f7; }
              .info-label { font-size: 12px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
              .info-value { font-size: 16px; color: #111; margin-top: 5px; font-weight: 500; }
              .message-box { background: white; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; margin: 20px 0; }
              .message-label { font-size: 12px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
              .message-content { white-space: pre-wrap; word-wrap: break-word; margin-top: 10px; line-height: 1.6; color: #374151; }
              .cta-box { background: #e0e7ff; padding: 20px; border-radius: 8px; border-left: 4px solid #a855f7; margin: 20px 0; }
              .cta-box a { color: #7c3aed; text-decoration: none; font-weight: 600; }
              .footer { background: #f3f4f6; padding: 20px; border-radius: 0 0 10px 10px; text-align: center; font-size: 12px; color: #6b7280; }
              .badge { display: inline-block; background: #dbeafe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; margin: 5px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🚀 New Contact Form Submission</h1>
                <p>Received on ${currentDate}</p>
              </div>
              
              <div class="content">
                <p style="margin-top: 0; color: #555;">You have received a new contact form submission. Details below:</p>
                
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">📧 Email</div>
                    <div class="info-value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">👤 Name</div>
                    <div class="info-value">${name}</div>
                  </div>
                  ${phone ? `
                    <div class="info-item">
                      <div class="info-label">📱 Phone</div>
                      <div class="info-value"><a href="tel:${phone}">${phone}</a></div>
                    </div>
                  ` : ''}
                  ${serviceType ? `
                    <div class="info-item">
                      <div class="info-label">🎯 Service Type</div>
                      <div class="info-value">${serviceType}</div>
                    </div>
                  ` : ''}
                  ${budget ? `
                    <div class="info-item">
                      <div class="info-label">💰 Budget</div>
                      <div class="info-value">${budget}</div>
                    </div>
                  ` : ''}
                  ${timeline ? `
                    <div class="info-item">
                      <div class="info-label">⏰ Timeline</div>
                      <div class="info-value">${timeline}</div>
                    </div>
                  ` : ''}
                </div>

                <div class="message-box">
                  <div class="message-label">💬 Project Description / Message</div>
                  <div class="message-content">${message}</div>
                </div>

                <div class="cta-box">
                  <p style="margin: 0 0 10px 0;">
                    <strong>Quick Actions:</strong>
                  </p>
                  <p style="margin: 0;">
                    📧 <a href="mailto:${email}">Reply via Email</a><br/>
                    📞 <a href="tel:${phone || '+919995475379'}">Call Client</a><br/>
                    📅 <a href="https://calendly.com">Schedule Meeting</a>
                  </p>
                </div>
              </div>

              <div class="footer">
                <p>© ${new Date().getFullYear()} Aravind V H Portfolio | Auto-generated notification</p>
              </div>
            </div>
          </body>
        </html>
      `,
      replyTo: email,
    };

    // Confirmation email to user
    const userMailOptions = {
      from: `"Aravind V H" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `✅ Thank you for reaching out, ${name}!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%); padding: 40px 20px; border-radius: 10px 10px 0 0; color: white; text-align: center; }
              .header h1 { margin: 0; font-size: 28px; }
              .header p { margin: 10px 0 0 0; opacity: 0.95; font-size: 16px; }
              .content { background: #f9fafb; padding: 30px 20px; }
              .section { margin: 25px 0; }
              .section-title { font-size: 18px; color: #111; font-weight: 600; margin-bottom: 15px; }
              .highlight-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #a855f7; line-height: 1.8; }
              .highlight-box p { margin: 10px 0; }
              .highlight-box strong { color: #a855f7; }
              .step-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ec4899; }
              .step-number { display: inline-block; background: #a855f7; color: white; width: 30px; height: 30px; border-radius: 50%; text-align: center; line-height: 30px; font-weight: bold; margin-right: 10px; }
              .step-text { display: inline-block; vertical-align: middle; }
              .footer { background: #f3f4f6; padding: 25px 20px; border-radius: 0 0 10px 10px; text-align: center; }
              .social-links { margin-top: 20px; }
              .social-links a { display: inline-block; margin: 0 10px; color: #a855f7; text-decoration: none; font-weight: 600; }
              .divider { height: 1px; background: #e5e7eb; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Thank You for Reaching Out!</h1>
                <p>Your message has been received</p>
              </div>
              
              <div class="content">
                <p style="margin-top: 0; font-size: 16px; color: #555;">Hi ${name},</p>

                <div class="section">
                  <div class="highlight-box">
                    <p>Thank you for getting in touch! I've received your inquiry and will review it carefully.</p>
                    <p>Your submission details have been recorded and you can expect a response <strong>within 24-48 hours</strong>.</p>
                  </div>
                </div>

                <div class="section">
                  <div class="section-title">📋 Your Submission Summary</div>
                  <div class="step-box">
                    <p><strong>Service Interested:</strong> ${serviceType || 'Not specified'}</p>
                    <p><strong>Budget Range:</strong> ${budget || 'Not specified'}</p>
                    <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
                  </div>
                </div>

                <div class="section">
                  <div class="section-title">⏭️ What Happens Next?</div>
                  <div class="step-box">
                    <div><span class="step-number">1</span><span class="step-text">I'll review your requirements</span></div>
                  </div>
                  <div class="step-box">
                    <div><span class="step-number">2</span><span class="step-text">Schedule a discovery call if needed</span></div>
                  </div>
                  <div class="step-box">
                    <div><span class="step-number">3</span><span class="step-text">Send you a detailed proposal</span></div>
                  </div>
                </div>

                <div class="section">
                  <div class="highlight-box" style="background: #fef3c7; border-left-color: #f59e0b;">
                    <p style="margin-top: 0; color: #92400e;"><strong>💡 Note:</strong> If your matter is urgent, feel free to reach out directly via phone or LinkedIn.</p>
                  </div>
                </div>

                <div class="divider"></div>

                <div class="section">
                  <p style="color: #666; margin-bottom: 10px;">Best regards,</p>
                  <p style="margin: 0;">
                    <strong style="font-size: 18px;">Aravind V H</strong><br/>
                    <span style="color: #a855f7; font-weight: 600;">Full Stack Developer & Software Engineer</span>
                  </p>
                </div>
              </div>

              <div class="footer">
                <div class="social-links">
                  <a href="https://linkedin.com/in/aravind-v-h-4862b5287">LinkedIn</a> •
                  <a href="mailto:aravindhari1718@gmail.com">Email</a> •
                  <a href="tel:+919995475379">Phone</a>
                </div>
                <p style="margin: 20px 0 0 0; font-size: 12px; color: #9ca3af;">
                  © ${new Date().getFullYear()} Aravind V H. All rights reserved.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send both emails
    const [adminResult, userResult] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    console.log('Admin email sent:', adminResult.messageId);
    console.log('User email sent:', userResult.messageId);

    return Response.json(
      {
        success: true,
        message: 'Emails sent successfully',
        messageIds: {
          admin: adminResult.messageId,
          user: userResult.messageId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      {
        success: false,
        error: error.message || 'Failed to send emails',
      },
      { status: 500 }
    );
  }
}
