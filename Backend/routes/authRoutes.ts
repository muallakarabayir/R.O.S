// routes/authRoutes.ts
import { Router, Request, Response } from "express";

const router = Router();

router.post("/sign-in", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (email === "admin@example.com" && password === "123456") {
    res.json({
      message: "Giriş başarılı!",
      user: { name: "Admin", role: "admin" },
    });
  } else {
    res.status(401).json({ message: "Geçersiz bilgiler." });
  }
});

export default router;
