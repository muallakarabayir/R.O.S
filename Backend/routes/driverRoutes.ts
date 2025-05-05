import { Router, Request, Response } from "express";
import * as Clerk from "@clerk/clerk-sdk-node";

const router = Router();

router.post("/sign-in", async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  try {
    const users = await Clerk.users.getUserList({ emailAddress: [email] });
    const user = users[0];

    if (!user || user.privateMetadata?.role !== "driver") {
      res.status(401).json({ message: "Geçersiz bilgiler." });
      return;
    }

    res.status(200).json({
      message: "Giriş başarılı!",
      user: {
        name: user.firstName,
        role: user.privateMetadata.role,
      },
    });
  } catch (err) {
    console.error("Şoför giriş hatası:", err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
});

export default router;
