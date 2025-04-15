export async function sendEmail(params: { to: string; subject: string; text: string; html: string }) {
  // TODO: Implement email sending logic here.
  // This is a placeholder implementation that logs the email details.
  console.log("Sending email:", params)
  return Promise.resolve()
}
