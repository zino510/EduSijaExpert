export default function handler(req, res) {
  res.status(200).json({
    message: "Hello from EduSijaExpert instance!",
    time: new Date().toISOString(),
  });
}
