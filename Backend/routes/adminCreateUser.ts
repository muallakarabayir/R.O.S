import { Router, RequestHandler } from "express";
import * as Clerk from "@clerk/clerk-sdk-node";

const router = Router();

// 👤 Kullanıcı oluşturma
const createUserHandler: RequestHandler = async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    const clerkUser = await Clerk.users.createUser({
      emailAddress: [email],
      password,
      firstName: name,
      privateMetadata: {
        role: role || "user",
      },
    });

    await saveToDatabase({
      clerkUserId: clerkUser.id,
      name,
      email,
      role: role || "user",
    });

    res.status(201).json({
      message: "Kullanıcı başarıyla oluşturuldu.",
      user: {
        id: clerkUser.id,
        name,
        email,
        role: role || "user",
      },
    });
  } catch (err: any) {
    console.error("Kayıt hatası:", err);
    res.status(500).json({ error: "Kullanıcı oluşturulamadı." });
  }
};

// 🚌 Şoför oluşturma
const createDriverHandler: RequestHandler = async (req, res) => {
  console.log("📥 İstek alındı: /admin/create-driver");
  console.log("📦 Gelen veri:", req.body);

  const { email, password, name, phone } = req.body;

  if (!email || !password || !name || !phone) {
    res.status(400).json({ message: "Tüm alanlar zorunludur." });
    return;
  }

  try {
    const clerkUser = await Clerk.users.createUser({
      emailAddress: [email],
      password,
      firstName: name,
      privateMetadata: {
        role: "driver",
      },
    });

    await saveToDatabase({
      clerkUserId: clerkUser.id,
      name,
      email,
      role: "driver",
    });

    res.status(201).json({
      message: "Şoför başarıyla oluşturuldu.",
      user: {
        id: clerkUser.id,
        name,
        email,
        role: "driver",
      },
    });
  } catch (err: any) {
    console.error("Şoför oluşturma hatası:", err);
    res.status(500).json({ error: "Şoför oluşturulamadı." });
  }
};

// ✅ Router'a tanımla
router.post("/admin/create-user", createUserHandler);
router.post("/admin/create-driver", createDriverHandler);

export default router;

// Simülasyon DB fonksiyonu
async function saveToDatabase(user: {
  clerkUserId: string;
  name: string;
  email: string;
  role: string;
}) {
  console.log("DB'ye kaydediliyor:", user);
}
