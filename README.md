# Gogo Style Group - E-Commerce Platform

A luxurious, high-performance eCommerce platform built specifically for fashion boutiques, specialized in dresses and coats. This full-stack application features a beautifully designed modern storefront and a comprehensive admin dashboard for robust inventory and order management.

## ✨ Features
- **Bilingual Support (English & Arabic):** Full localization & RTL support out-of-the-box.
- **Dynamic Product Showcases:** Automatic sequential product image carousels on hover and CSS linear-gradient color swatches for dual-color items (like `black/red`).
- **Complete Shopping Cart & Checkout:** Seamless CartContext state management, required variant selections, and robust order submission.
- **Advanced Admin Dashboard:** 
  - Manage Orders: View customer details, update shipping statuses (Pending, Shipped, Delivered), and manage inventory.
  - Manage Products: Complete CRUD control with multi-image upload functionality and stock management.
- **Customer Pages:** Built-in routes for order tracking, customer reviews, and help center support.

## 🛠️ Technology Stack
- **Frontend:** Next.js 16 (App Router), React, TypeScript, Vanilla CSS Modules
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Asset Management:** Multer (Local File Uploads)

---

# جوجو ستايل جروب - منصة تجارة إلكترونية متكاملة

منصة تجارة إلكترونية فاخرة وعالية الأداء مصممة خصيصًا لمتاجر الأزياء والفساتين. يتميز هذا التطبيق المتكامل بواجهة متجر عصرية مصممة بشكل احترافي، بالإضافة إلى لوحة تحكم إدارية شاملة لإدارة المخزون والطلبات بقوة وكفاءة.

## ✨ المميزات
- **دعم ثنائي اللغة (عربي/إنجليزي):** توطين كامل للموقع ودعم تلقائي لاتجاه النص من اليمين لليسار (RTL).
- **عرض متحرك وديناميكي للمنتجات:** تقليب تلقائي للصور عند تمرير الماوس، عرض الألوان المزدوجة بذكاء (مثل أسود/أحمر) عبر دوائر بألوان متدرجة.
- **سلة تسوق ودفع متكاملة:** إدارة حالة السلة بستخدام السياق، إجبار اختيار اللون المناسب للمنتج، وتجربة إتمام طلب سلسة وسريعة.
- **لوحة تحكم إدارية متقدمة (Dashboard):**
  - **إدارة الطلبات:** عرض تفاصيل العميل بالكامل (مثل رقم الهاتف)، تحديث حالات الشحن (قيد الانتظار، تم الشحن، تم التوصيل).
  - **إدارة المنتجات:** إضافة فساتين ومعاطف جديدة، رفع صور متعددة في وقت واحد لمنتج واحد، وإدارة شاملة للمخزون.
- **صفحات مخصصة للعملاء:** تتبع حالة الطلب، تقييمات العملاء، ومركز المساعدة للرد السريع.

## 🛠️ التقنيات المستخدمة
- **الواجهة الأمامية (Frontend):** Next.js 16 (App Router), React, TypeScript, Vanilla CSS Modules
- **الواجهة الخلفية (Backend):** Node.js، Express.js
- **قواعد البيانات (Database):** MongoDB (Mongoose)
- **إدارة الملفات والصور:** Multer لحفظ الصور على الخادم المحلي

## 🚀 كيفية التشغيل (How to Run Locally)

1. **إعداد الخادم الخلفي (Backend):**
   ```bash
   cd backend
   npm install
   # قم بإنشاء ملف .env وضع بداخله أوامر الاتصال بقاعدة البيانات (MONGO_URI و PORT)
   npm start # أو `node server.js`
   ```

2. **إعداد واجهة المستخدم (Frontend):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. افتح المتصفح على الرابط `http://localhost:3000` لمشاهدة المتجر.
