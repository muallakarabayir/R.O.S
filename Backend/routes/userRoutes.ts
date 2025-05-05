import { Router, Request, Response } from "express";

const router = Router();

// Sahte kullanıcı listesi (test amaçlı, veritabanından çekmen gerekir)
const mockUsers = [
  { id: 1, name: "Admin", email: "admin@example.com", role: "admin" },
  { id: 2, name: "Ali Veli", email: "ali@example.com", role: "user" },
];

router.get("/users", async (_req: Request, res: Response) => {
  try {
    // Gerçek projede burada DB sorgusu olacak
    res.json(mockUsers);
  } catch (err) {
    res.status(500).json({ error: "Kullanıcılar alınamadı." });
  }
});

export default router;
