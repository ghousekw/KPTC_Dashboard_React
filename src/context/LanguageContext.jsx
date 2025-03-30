import { createContext, useState, useContext, useEffect } from 'react';

// Expanded translations based on provided template
const translations = {
  // Help System - Login Page
  'Login Page Help': {
    ar: 'مساعدة صفحة تسجيل الدخول'
  },
  'Getting Started': {
    ar: 'البدء'
  },
  'Welcome to the KPTC Dashboard login page. This guide will walk you through each step of the login process.': {
    ar: 'مرحبًا بك في صفحة تسجيل الدخول إلى لوحة معلومات KPTC. سيرشدك هذا الدليل خلال كل خطوة من عملية تسجيل الدخول.'
  },
  'The KPTC Dashboard login screen': {
    ar: 'شاشة تسجيل الدخول إلى لوحة معلومات KPTC'
  },
  'Login Process Overview': {
    ar: 'نظرة عامة على عملية تسجيل الدخول'
  },
  'Enter Username': {
    ar: 'أدخل اسم المستخدم'
  },
  'Enter Password': {
    ar: 'أدخل كلمة المرور'
  },
  'Click Login': {
    ar: 'انقر على تسجيل الدخول'
  },
  'Access Dashboard': {
    ar: 'الوصول إلى لوحة المعلومات'
  },
  'Step-by-Step Login Guide': {
    ar: 'دليل تسجيل الدخول خطوة بخطوة'
  },
  'Step 1': {
    ar: 'الخطوة 1'
  },
  'Step 2': {
    ar: 'الخطوة 2'
  },
  'Step 3': {
    ar: 'الخطوة 3'
  },
  'Step 4': {
    ar: 'الخطوة 4'
  },
  'Enter Your Username': {
    ar: 'أدخل اسم المستخدم الخاص بك'
  },
  'Find the "User Name" field at the top of the login form.': {
    ar: 'ابحث عن حقل "اسم المستخدم" في أعلى نموذج تسجيل الدخول.'
  },
  'Look for the first input field labeled "User Name"': {
    ar: 'ابحث عن حقل الإدخال الأول المسمى "اسم المستخدم"'
  },
  'Click inside the field to activate it': {
    ar: 'انقر داخل الحقل لتنشيطه'
  },
  'Type your assigned username': {
    ar: 'اكتب اسم المستخدم المخصص لك'
  },
  'Your username is typically assigned by your system administrator and is case-sensitive.': {
    ar: 'عادة ما يتم تعيين اسم المستخدم الخاص بك من قبل مسؤول النظام وهو حساس لحالة الأحرف.'
  },
  'Enter Your Password': {
    ar: 'أدخل كلمة المرور الخاصة بك'
  },
  'Next, enter your password in the password field.': {
    ar: 'بعد ذلك، أدخل كلمة المرور الخاصة بك في حقل كلمة المرور.'
  },
  'Click in the password field (located below the username field)': {
    ar: 'انقر في حقل كلمة المرور (الموجود أسفل حقل اسم المستخدم)'
  },
  'Type your password': {
    ar: 'اكتب كلمة المرور الخاصة بك'
  },
  'Show/Hide Password: If you need to verify what you\'ve typed, click the eye icon at the right side of the password field to show your password': {
    ar: 'إظهار/إخفاء كلمة المرور: إذا كنت بحاجة إلى التحقق مما كتبته، انقر على رمز العين في الجانب الأيمن من حقل كلمة المرور لإظهار كلمة المرور الخاصة بك'
  },
  'How to show/hide your password using the visibility toggle': {
    ar: 'كيفية إظهار/إخفاء كلمة المرور باستخدام زر الرؤية'
  },
  'Your password is hidden for security purposes. Make sure no one can see your screen while entering your password.': {
    ar: 'يتم إخفاء كلمة المرور الخاصة بك لأغراض أمنية. تأكد من عدم وجود أحد يمكنه رؤية شاشتك أثناء إدخال كلمة المرور الخاصة بك.'
  },
  'Click the Login Button': {
    ar: 'انقر على زر تسجيل الدخول'
  },
  'After entering your credentials, click the "Login" button to access the system.': {
    ar: 'بعد إدخال بيانات الاعتماد الخاصة بك، انقر على زر "تسجيل الدخول" للوصول إلى النظام.'
  },
  'Verify that you\'ve entered both your username and password correctly': {
    ar: 'تحقق من إدخال اسم المستخدم وكلمة المرور بشكل صحيح'
  },
  'Click the blue "Login" button located below the password field': {
    ar: 'انقر على زر "تسجيل الدخول" الأزرق الموجود أسفل حقل كلمة المرور'
  },
  'Wait for the system to authenticate your credentials': {
    ar: 'انتظر حتى يتحقق النظام من بيانات الاعتماد الخاصة بك'
  },
  'The authentication process usually takes a few seconds. Please be patient.': {
    ar: 'عادة ما تستغرق عملية المصادقة بضع ثوانٍ. يرجى التحلي بالصبر.'
  },
  'Access the Dashboard': {
    ar: 'الوصول إلى لوحة المعلومات'
  },
  'After successful authentication, you\'ll be redirected to the KPTC Dashboard.': {
    ar: 'بعد المصادقة الناجحة، ستتم إعادة توجيهك إلى لوحة معلومات KPTC.'
  },
  'Verify that you can see the dashboard with various statistics and menu items': {
    ar: 'تحقق من أنه يمكنك رؤية لوحة المعلومات مع إحصائيات وعناصر قائمة مختلفة'
  },
  'Check the top-right corner to confirm you\'re logged in with your username': {
    ar: 'تحقق من الزاوية اليمنى العليا للتأكد من أنك قمت بتسجيل الدخول باسم المستخدم الخاص بك'
  },
  'Begin using the system!': {
    ar: 'ابدأ باستخدام النظام!'
  },
  // Help System - General
  'Dashboard Help': {
    ar: 'مساعدة لوحة المعلومات'
  },
  'Login Help': {
    ar: 'مساعدة تسجيل الدخول'
  },
  'Open Help': {
    ar: 'فتح المساعدة'
  },
  'Close Help': {
    ar: 'إغلاق المساعدة'
  },
  'Keyboard Shortcuts': {
    ar: 'اختصارات لوحة المفاتيح'
  },
  'You are on a mobile device. The help interface will adjust for smaller screens.': {
    ar: 'أنت تستخدم جهازًا محمولًا. سيتم ضبط واجهة المساعدة لشاشة أصغر.'
  },
  'Help System Test': {
    ar: 'اختبار نظام المساعدة'
  },
  'Click the buttons below to view different help sections:': {
    ar: 'انقر على الأزرار أدناه لعرض أقسام المساعدة المختلفة:'
  },

  // Menu items
  'Dashboard & Reports': {
    ar: 'لوحة المعلومات والتقارير'
  },
  'MOI Reception': {
    ar: 'استقبال وزارة الداخلية'
  },
  'KPTC Reception': {
    ar: 'استقبال KPTC'
  },
  'Garage': {
    ar: 'المرآب'
  },
  'Procurement': {
    ar: 'المشتريات'
  },
  'Accounts': {
    ar: 'الحسابات'
  },
  'Stores': {
    ar: 'المخازن'
  },
  'Master': {
    ar: 'الرئيسية'
  },
  'Help File': {
    ar: 'ملف المساعدة'
  },
  'Logout': {
    ar: 'تسجيل الخروج'
  },
  // Header 
  'Admin': {
    ar: 'المسؤول'
  },
  'Arabic': {
    ar: 'English'  // When in Arabic, show English as the alternate
  },
  // Stats
  'Job Order Total': {
    ar: 'إجمالي أوامر العمل'
  },
  'All active job orders': {
    ar: 'جميع أوامر العمل النشطة'
  },
  'Job Order Completed': {
    ar: 'أوامر العمل المكتملة'
  },
  'Finished job orders': {
    ar: 'أوامر العمل المنتهية'
  },
  'Job Order In Progress': {
    ar: 'أوامر العمل قيد التنفيذ'
  },
  'Currently processing': {
    ar: 'جاري المعالجة حالياً'
  },
  'Job Order On Hold': {
    ar: 'أوامر العمل المعلقة'
  },
  'Temporarily stopped': {
    ar: 'متوقفة مؤقتاً'
  },
  // Filter Section
  'Filter Options': {
    ar: 'خيارات التصفية'
  },
  'From Date': {
    ar: 'من تاريخ'
  },
  'To Date': {
    ar: 'إلى تاريخ'
  },
  'Job Order No.': {
    ar: 'رقم أمر العمل'
  },
  'Plate No.': {
    ar: 'رقم اللوحة'
  },
  'Vehicle Make': {
    ar: 'نوع المركبة'
  },
  'Garage Location': {
    ar: 'المرآب'
  },
  'MOI Job Order No.': {
    ar: 'رقم أمر عمل وزارة الداخلية'
  },
  'Current JO Status': {
    ar: 'حالة أمر العمل الحالية'
  },
  'All': {
    ar: 'الكل'
  },
  'Proceed': {
    ar: 'متابعة'
  },
  'Reset': {
    ar: 'إعادة ضبط'
  },
  // Table Header
  'Job Orders in March 2025': {
    ar: 'أوامر العمل في مارس 2025'
  },
  'S.No.': {
    ar: 'م.'
  },
  'JO No.': {
    ar: 'رقم أمر العمل'
  },
  'JO Date': {
    ar: 'تاريخ أمر العمل'
  },
  'Technician': {
    ar: 'الفني'
  },
  'JO Status': {
    ar: 'حالة أمر العمل'
  },
  'Actions': {
    ar: 'الإجراءات'
  },
  // Status badges
  'Warranty Initiated': {
    ar: 'بدء الضمان'
  },
  'JO Submitted': {
    ar: 'تم تقديم أمر العمل'
  },
  'Estimation Approved': {
    ar: 'تمت الموافقة على التقدير'
  },
  // Vehicle makes
  'TOYOTA': {
    ar: 'تويوتا'
  },
  'GMC': {
    ar: 'جي إم سي'
  },
  'KIA': {
    ar: 'كيا'
  },
  'MOI SULABIYA MAIN': {
    ar: 'وزارة الداخلية - الصليبية الرئيسي'
  },
  'MOI AHMADI': {
    ar: 'وزارة الداخلية - الأحمدي'
  },
  // Table actions
  'View Details': {
    ar: 'عرض التفاصيل'
  },
  'Edit Record': {
    ar: 'تعديل السجل'
  },
  'Print Report': {
    ar: 'طباعة التقرير'
  },
  'Download PDF': {
    ar: 'تنزيل PDF'
  },
  'Share': {
    ar: 'مشاركة'
  },
  'Delete': {
    ar: 'حذف'
  },
  // Pagination
  'Showing 1 to 5 of 16 entries': {
    ar: 'عرض 1 إلى 5 من 16 سجل'
  },
  'Click on a job order to view cost projection': {
    ar: 'انقر على أمر عمل لعرض توقعات التكلفة'
  },
  'Previous': {
    ar: 'السابق'
  },
  'Next': {
    ar: 'التالي'
  },
  // Table buttons
  'Export to Excel': {
    ar: 'تصدير إلى Excel'
  },
  'Export to PDF': {
    ar: 'تصدير إلى PDF'
  },
  'Print': {
    ar: 'طباعة'
  },
  'Refresh': {
    ar: 'تحديث'
  },
  // Mobile hint
  'Scroll to see more': {
    ar: 'مرر للمشاهدة المزيد'
  },
  // Footer
  'Documentation': {
    ar: 'التوثيق'
  },
  'Support': {
    ar: 'الدعم'
  },
  'Privacy Policy': {
    ar: 'سياسة الخصوصية'
  },
  'Settings': {
    ar: 'الإعدادات'
  },
  // Vehicle makes
  'Chevrolet': {
    ar: 'شيفروليه'
  },
  'Nissan': {
    ar: 'نيسان'
  },
  'Mitsubishi': {
    ar: 'ميتسوبيشي'
  },
  // Contracting Party Overview translations
  'Contracting Party Overview': {
    ar: 'نظرة عامة على الطرف المتعاقد'
  },
  'Work Order Acceptance Status': {
    ar: 'حالة قبول أوامر العمل'
  },
  'Implementation Status Trends': {
    ar: 'اتجاهات حالة التنفيذ'
  },
  'Financial Balances': {
    ar: 'الأرصدة المالية'
  },
  'Recent Work Order Approvals': {
    ar: 'الموافقات الأخيرة على أوامر العمل'
  },
  'Accepted': {
    ar: 'مقبول'
  },
  'Pending Review': {
    ar: 'قيد المراجعة'
  },
  'Rejected': {
    ar: 'مرفوض'
  },
  'On Hold': {
    ar: 'معلق مؤقتاً'
  },
  'Contract Value': {
    ar: 'قيمة العقد'
  },
  'Billed Amount': {
    ar: 'المبلغ المفوتر'
  },
  'Received Payments': {
    ar: 'المدفوعات المستلمة'
  },
  'Total Work Orders': {
    ar: 'إجمالي أوامر العمل'
  },
  'Contract Completion': {
    ar: 'إكمال العقد'
  },
  'Contract Balance': {
    ar: 'رصيد العقد'
  },
  'Pending Approvals': {
    ar: 'الموافقات المعلقة'
  },
  'Order ID': {
    ar: 'رقم الطلب'
  },
  'Value': {
    ar: 'القيمة'
  },
  'Submitted Date': {
    ar: 'تاريخ التقديم'
  },
  'Engine repair and maintenance - Toyota': {
    ar: 'إصلاح وصيانة المحرك - تويوتا'
  },
  'Electrical system overhaul - Nissan': {
    ar: 'إصلاح شامل للنظام الكهربائي - نيسان'
  },
  'Brake system replacement - GMC': {
    ar: 'استبدال نظام الفرامل - جي إم سي'
  },
  'Transmission repair - KIA': {
    ar: 'إصلاح ناقل الحركة - كيا'
  },
  'Vehicle inspection - Honda': {
    ar: 'فحص المركبة - هوندا'
  },
  // Executive Summary translations
  'Executive Management Dashboard': {
    ar: 'لوحة الإدارة التنفيذية'
  },
  'Work Implementation Status': {
    ar: 'حالة تنفيذ العمل'
  },
  'Financial Overview': {
    ar: 'نظرة مالية عامة'
  },
  'Priority Pending Tasks': {
    ar: 'المهام المعلقة ذات الأولوية'
  },
  'Implemented': {
    ar: 'تم التنفيذ'
  },
  'In Progress': {
    ar: 'قيد التنفيذ'
  },
  'Pending': {
    ar: 'معلق'
  },
  'Revenue': {
    ar: 'الإيرادات'
  },
  'Expenses': {
    ar: 'المصروفات'
  },
  'Total Job Orders': {
    ar: 'إجمالي أوامر العمل'
  },
  'Average Completion Time': {
    ar: 'متوسط وقت الإنجاز'
  },
  'days': {
    ar: 'أيام'
  },
  'Customer Satisfaction': {
    ar: 'رضا العملاء'
  },
  'Revenue Per Job': {
    ar: 'الإيرادات لكل عمل'
  },
  'Task ID': {
    ar: 'رقم المهمة'
  },
  'Description': {
    ar: 'الوصف'
  },
  'Assigned To': {
    ar: 'مسند إلى'
  },
  'Due Date': {
    ar: 'تاريخ الاستحقاق'
  },
  'Status': {
    ar: 'الحالة'
  },
  'Engine diagnostics system upgrade': {
    ar: 'ترقية نظام تشخيص المحرك'
  },
  'New transmission repair tool installation': {
    ar: 'تركيب أداة إصلاح ناقل الحركة الجديدة'
  },
  'Customer service training program': {
    ar: 'برنامج تدريب خدمة العملاء'
  },
  'Quarterly inventory audit': {
    ar: 'التدقيق الربع سنوي للمخزون'
  },
  'Q1': {
    ar: 'الربع 1'
  },
  'Q2': {
    ar: 'الربع 2'
  },
  'Q3': {
    ar: 'الربع 3'
  },
  'Q4': {
    ar: 'الربع 4'
  },
  'Download': {
    ar: 'تنزيل'
  },
  'More': {
    ar: 'المزيد'
  },
  'Close': {
    ar: 'إغلاق'
  },
  // Job Card Cost Projection translations
  'Job Card Cost Projection': {
    ar: 'توقعات تكلفة بطاقة العمل'
  },
  'Vehicle': {
    ar: 'المركبة'
  },
  'Technician_JobCard': {
    ar: 'الفني'
  },
  'Created': {
    ar: 'تاريخ الإنشاء'
  },
  'Est. Completion': {
    ar: 'تاريخ الانتهاء المتوقع'
  },
  'Total Cost': {
    ar: 'التكلفة الإجمالية'
  },
  'Original Estimate': {
    ar: 'التقدير الأصلي'
  },
  'Variance': {
    ar: 'الاختلاف'
  },
  'Cost Breakdown': {
    ar: 'تفصيل التكاليف'
  },
  'Cost Projection': {
    ar: 'توقعات التكلفة'
  },
  'Detailed Cost Breakdown': {
    ar: 'تفصيل التكاليف المفصلة'
  },
  'Labor Cost': {
    ar: 'تكلفة العمالة'
  },
  'Parts Cost': {
    ar: 'تكلفة القطع'
  },
  'Service Charges': {
    ar: 'رسوم الخدمة'
  },
  'Tax Amount': {
    ar: 'مبلغ الضريبة'
  },
  'View Full Estimate': {
    ar: 'عرض التقدير الكامل'
  },
  'Print_Report_JobCard': {
    ar: 'طباعة التقرير'
  },
  'Engine': {
    ar: 'المحرك'
  },
  'Transmission': {
    ar: 'ناقل الحركة'
  },
  'Electrical': {
    ar: 'النظام الكهربائي'
  },
  'Brakes': {
    ar: 'الفرامل'
  },
  'Body Work': {
    ar: 'أعمال الهيكل'
  },
  'Projected Cost': {
    ar: 'التكلفة المتوقعة'
  },
  'Actual Cost': {
    ar: 'التكلفة الفعلية'
  },
  'In_Progress_JobCard': {
    ar: 'قيد التنفيذ'
  },
  // Add missing technician-related translations
  'Running Job Cards by Technician': {
    ar: 'بطاقات العمل الجارية حسب الفني'
  },
  'Active Jobs': {
    ar: 'الوظائف النشطة'
  },
  'Mike (Engine)': {
    ar: 'مايك (محرك)'
  },
  'Sara (Electrical)': {
    ar: 'سارة (كهربائي)'
  },
  'Raj (Brakes)': {
    ar: 'راج (فرامل)'
  },
  'Carlos (Transmission)': {
    ar: 'كارلوس (ناقل الحركة)'
  },
  'Ahmed (Body Work)': {
    ar: 'أحمد (أعمال الهيكل)'
  },
  // Add missing translations for staff names and currency
  'Mike Ahmed': {
    ar: 'مايك أحمد'
  },
  'Sara Khan': {
    ar: 'سارة خان'
  },
  'Ahmed Ali': {
    ar: 'أحمد علي'
  },
  'Carlos Diaz': {
    ar: 'كارلوس دياز'
  },
  'KWD': {
    ar: 'د.ك'
  },
  // Performance Indicators translations
  'Key Performance Indicators': {
    ar: 'مؤشرات الأداء الرئيسية'
  },
  'Avg. Turnaround Time': {
    ar: 'متوسط وقت التنفيذ'
  },
  'Days': {
    ar: 'أيام'
  },
  'Target: 3 Days': {
    ar: 'الهدف: 3 أيام'
  },
  'First Time Fix Rate': {
    ar: 'معدل الإصلاح من أول مرة'
  },
  'Target: 85%': {
    ar: 'الهدف: 85٪'
  },
  'Customer_Satisfaction_KPI': {
    ar: 'رضا العملاء'
  },
  'Target: 90%': {
    ar: 'الهدف: 90٪'
  },
  'Labor Utilization': {
    ar: 'استغلال العمالة'
  },
  // Quick Actions translations
  'Create New Job Order': {
    ar: 'إنشاء أمر عمل جديد'
  },
  'Pending_Approvals_QuickActions': {
    ar: 'الموافقات المعلقة'
  },
  'Requires your attention': {
    ar: 'تتطلب اهتمامك'
  },
  'View all pending approvals': {
    ar: 'عرض جميع الموافقات المعلقة'
  },
  'Maintenance Alerts': {
    ar: 'تنبيهات الصيانة'
  },
  'Critical maintenance needed': {
    ar: 'الصيانة الحرجة المطلوبة'
  },
  'View maintenance details': {
    ar: 'عرض تفاصيل الصيانة'
  },
  'Generate Reports': {
    ar: 'إنشاء التقارير'
  },
  'Download Reports': {
    ar: 'تنزيل التقارير'
  },
  // JobCardFlow translations
  'Job Card Process Flow': {
    ar: 'تدفق عملية بطاقة العمل'
  },
  'Reception': {
    ar: 'استقبال'
  },
  'Initial assessment': {
    ar: 'التقييم الأولي'
  },
  'Inspection': {
    ar: 'الفحص'
  },
  'Detailed diagnosis': {
    ar: 'التشخيص المفصل'
  },
  'Estimation': {
    ar: 'التقدير'
  },
  'Cost approval': {
    ar: 'الموافقة على التكلفة'
  },
  'Repair': {
    ar: 'الإصلاح'
  },
  'Service execution': {
    ar: 'تنفيذ الخدمة'
  },
  'Quality Check': {
    ar: 'فحص الجودة'
  },
  'Final inspection': {
    ar: 'الفحص النهائي'
  },
  'Delivery': {
    ar: 'التسليم'
  },
  'Handover to client': {
    ar: 'التسليم للعميل'
  },
  // Job Order Trends Chart translations
  'Monthly Job Order Trends': {
    ar: 'اتجاهات أوامر العمل الشهرية'
  },
  'New Orders': {
    ar: 'أوامر عمل جديدة'
  },
  'Completed Orders': {
    ar: 'أوامر العمل المكتملة'
  },
  'Jan': {
    ar: 'يناير'
  },
  'Feb': {
    ar: 'فبراير'
  },
  'Mar': {
    ar: 'مارس'
  },
  'Apr': {
    ar: 'أبريل'
  },
  'May': {
    ar: 'مايو'
  },
  'Jun': {
    ar: 'يونيو'
  },
  'Jul': {
    ar: 'يوليو'
  },
  'Aug': {
    ar: 'أغسطس'
  },
  'Sep': {
    ar: 'سبتمبر'
  },
  'Oct': {
    ar: 'أكتوبر'
  },
  'Nov': {
    ar: 'نوفمبر'
  },
  'Dec': {
    ar: 'ديسمبر'
  },
  // Detailed Status Breakdown translations
  'Detailed Status Breakdown': {
    ar: 'تفصيل حالة العمل'
  },
  'In Register': {
    ar: 'في السجل'
  },
  'Active initial JOs': {
    ar: 'أوامر العمل الأولية النشطة'
  },
  'Pending QA': {
    ar: 'في انتظار ضمان الجودة'
  },
  'Awaiting quality check': {
    ar: 'في انتظار فحص الجودة'
  },
  'Ready for Delivery': {
    ar: 'جاهز للتسليم'
  },
  'Completed and ready': {
    ar: 'مكتمل وجاهز'
  },
  'Parts Pending': {
    ar: 'قطع الغيار معلقة'
  },
  'Waiting for parts': {
    ar: 'في انتظار قطع الغيار'
  },
  // Repair Jobs Status Breakdown translations
  'Repair Jobs Status Breakdown': {
    ar: 'تفصيل حالة مهام الإصلاح'
  },
  'Completed': {
    ar: 'مكتمل'
  },
  'Waiting Parts': {
    ar: 'في انتظار قطع الغيار'
  },
  // Workflow Status Chart translations
  'Approved Workflow Status': {
    ar: 'حالة سير العمل المعتمدة'
  },
  'Stage 1': {
    ar: 'المرحلة 1'
  },
  'Stage 2': {
    ar: 'المرحلة 2'
  },
  'Stage 3': {
    ar: 'المرحلة 3'
  },
  'Stage 4': {
    ar: 'المرحلة 4'
  },
  'Stage 5': {
    ar: 'المرحلة 5'
  },
  // Filter functionality
  'Filter': {
    ar: 'تصفية'
  },
  // Garage selector
  "All Garages": "جميع الكراجات",
  "Garage_Selector": "كراج",
  "Select Garage": "اختر الكراج",
  "Completed Jobs": "المهام المكتملة",
  "Pending Jobs": "المهام المعلقة",
  "Total Vehicles": "إجمالي المركبات",
  "In Service": "في الخدمة",
  "Completion Rate": "معدل الإنجاز",
  "Awaiting Completion": "بانتظار الإكمال",
  "Monthly Income": "الدخل الشهري",
  "Weekly Income": "الدخل الأسبوعي",
  "Monthly Expenses": "المصروفات الشهرية",
  "Based on completed job orders": "بناءً على أوامر العمل المكتملة",
  "Last 7 days": "آخر 7 أيام",
  "Parts and maintenance costs": "تكاليف القطع والصيانة",
  "Total_Job_Orders_Summary": "إجمالي أوامر العمل",
};

// Create the language context
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Get stored language or default to English
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem('kptc_lang') || 'en'
  );

  // Toggle language function
  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    setCurrentLang(newLang);
    localStorage.setItem('kptc_lang', newLang);
    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
  };

  // Get translation function
  const getTranslation = (key) => {
    // Only add translation if the key exists and has a translation for current language
    if (translations[key] && translations[key][currentLang]) {
      return translations[key][currentLang];
    }
    return key; // Return the key itself as fallback if no translation found
  };

  // Set document direction based on language
  useEffect(() => {
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    
    // Add rtl-layout class to body for RTL styles
    if (currentLang === 'ar') {
      document.body.classList.add('rtl-layout');
    } else {
      document.body.classList.remove('rtl-layout');
    }
  }, [currentLang]);

  return (
    <LanguageContext.Provider value={{ currentLang, toggleLanguage, getTranslation, language: currentLang, setLanguage: (lang) => setCurrentLang(lang) }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext); 