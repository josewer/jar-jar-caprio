export const workerMiddleware = (req, res, next) => {
  console.log(`Worker ${process.pid} atendiendo ${req.method} ${req.url}`);
  res.setHeader('X-Worker-PID', process.pid);
  next();
};
