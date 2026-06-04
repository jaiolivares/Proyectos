import rateLimit from "express-rate-limit";

export interface CreateRateLimiterOptions {
  windowMs?: number;
  max?: number;
  message?: any;
  keyPrefix?: string;
}

export const createRateLimiter = (opts: CreateRateLimiterOptions = {}) => {
  const {
    windowMs = 1,
    max = 30,
    message = {
      EjecucionCorrecta: false,
      Mensaje: "Demasiadas solicitudes. Intente nuevamente en unos minutos.",
      Dato: null,
    },
    keyPrefix,
  } = opts;

  const options: any = {
    windowMs: windowMs * 60 * 1000,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: any, res: any) => {
      return res.status(429).json(message);
    },
  };

  if (keyPrefix) {
    options.keyGenerator = (req: any) => `${keyPrefix}:${req.ip}`;
  }

  return rateLimit(options);
};

export default createRateLimiter;
