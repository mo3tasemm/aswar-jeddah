import { f as useAdminAuth, h as useState, $ as $fetch$2, a as useToast } from '../virtual/entry.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { ref, reactive, computed } from 'vue';

//#region services/privacyPolicyApiService.ts
/**
* Privacy Policy API Service Layer
* Multi-language Translation Support, Cache Invalidation, and Fallback Handlers
*/
var getApiBaseUrl = () => {
	return (process.env.NUXT_PUBLIC_API_BASE || "https://ai-agunt.elbakry2.com/api/v1").replace(/\/$/, "");
};
var privacyPolicyApiService = {
	/**
	* 1. GET Public Privacy Policy Data
	*/
	async fetchPrivacyPolicy(lang = "ar", force = false) {
		const apiBase = getApiBaseUrl();
		const endpoints = [
			`${apiBase}/privacy-policy`,
			`${apiBase}/privacy_policy`,
			`${apiBase}/terms-and-conditions`,
			`${apiBase}/admin/privacy-policy`,
			`${apiBase}/admin/privacy_policy`
		];
		const params = { lang };
		if (force || false) params._t = Date.now();
		const headers = {
			"Accept": "application/json",
			"Accept-Language": lang === "en" ? "en" : "ar",
			"X-localization": lang === "en" ? "EN" : "sa",
			"lang": lang === "en" ? "EN" : "sa",
			"Cache-Control": "no-cache, no-store, must-revalidate",
			"Pragma": "no-cache",
			"Expires": "0"
		};
		for (const url of endpoints) try {
			const response = await $fetch$2(url, {
				method: "GET",
				params,
				headers,
				timeout: 8e3
			});
			const raw = response?.data?.data || response?.data || response?.privacy_policy || response?.policy || response?.item || response;
			if (raw && typeof raw === "object") return {
				success: true,
				data: this.normalizePrivacyPolicy(raw, lang)
			};
		} catch (err) {}
		return {
			success: true,
			data: this.getDefaultPrivacyPolicy(lang)
		};
	},
	/**
	* 2. GET Admin Privacy Policy Data
	*/
	async fetchAdminPrivacyPolicy(token, force = false) {
		const apiBase = getApiBaseUrl();
		const endpoints = [
			`${apiBase}/admin/privacy-policy`,
			`${apiBase}/admin/privacy_policy`,
			`${apiBase}/privacy-policy`,
			`${apiBase}/privacy_policy`
		];
		const params = {};
		if (force || false) params._t = Date.now();
		const headers = {
			"Accept": "application/json",
			"X-Requested-With": "XMLHttpRequest",
			"X-localization": "sa",
			"lang": "sa",
			"Cache-Control": "no-cache, no-store, must-revalidate",
			"Pragma": "no-cache",
			"Expires": "0"
		};
		if (token) headers["Authorization"] = `Bearer ${token}`;
		for (const url of endpoints) try {
			const response = await $fetch$2(url, {
				method: "GET",
				params,
				headers,
				timeout: 1e4
			});
			const raw = response?.data?.data || response?.data || response?.privacy_policy || response?.policy || response?.item || response;
			if (raw && typeof raw === "object") return {
				success: true,
				data: this.normalizePrivacyPolicy(raw, "ar")
			};
		} catch (err) {}
		return {
			success: true,
			data: this.getDefaultPrivacyPolicy("ar")
		};
	},
	/**
	* 3. POST / PUT Update Admin Privacy Policy
	*/
	async updateAdminPrivacyPolicy(token, payload) {
		const apiBase = getApiBaseUrl();
		const endpoints = [
			{
				url: `${apiBase}/admin/privacy-policy`,
				method: "POST"
			},
			{
				url: `${apiBase}/admin/privacy-policy`,
				method: "PUT"
			},
			{
				url: `${apiBase}/admin/privacy_policy`,
				method: "POST"
			},
			{
				url: `${apiBase}/admin/privacy_policy`,
				method: "PUT"
			}
		];
		const isFd = payload instanceof FormData;
		const headers = {
			"Authorization": `Bearer ${token}`,
			"Accept": "application/json",
			"X-Requested-With": "XMLHttpRequest"
		};
		let body = payload;
		if (!isFd) {
			headers["Content-Type"] = "application/json";
			body = JSON.stringify(payload);
		}
		let lastError = null;
		for (const ep of endpoints) try {
			const response = await fetch(ep.url, {
				method: ep.method,
				headers,
				body
			});
			const json = await response.json().catch(() => ({}));
			if (response.ok && (json.success !== false || json.status === "success" || json.data)) {
				const raw = json.data?.data || json.data || json.privacy_policy || json.policy || json.item || json;
				return {
					success: true,
					message: json.message || json.data?.message || "تم حفظ وتحديث سياسة الخصوصية والشروط بنجاح!",
					data: this.normalizePrivacyPolicy(raw, "ar")
				};
			} else if (!response.ok) lastError = json;
		} catch (err) {
			lastError = err;
		}
		if (lastError) {
			console.error("[privacyPolicyApiService] updateAdminPrivacyPolicy error:", lastError);
			throw new Error(lastError?.message || lastError?.data?.message || "تعذر حفظ التعديلات");
		}
		return {
			success: true,
			message: "تم حفظ التعديلات بنجاح"
		};
	},
	/**
	* Normalizes server response
	*/
	normalizePrivacyPolicy(raw, lang = "ar") {
		if (!raw || typeof raw !== "object") return this.getDefaultPrivacyPolicy(lang);
		let item = raw;
		if (item.data && typeof item.data === "object" && !Array.isArray(item.data)) item = item.data;
		if (item.privacy_policy && typeof item.privacy_policy === "object") item = item.privacy_policy;
		if (item.policy && typeof item.policy === "object") item = item.policy;
		return {
			id: item.id || 1,
			title: item.title || item.title_ar || item.name || "سياسة الخصوصية والشروط والأحكام",
			title_ar: item.title_ar || item.title || "سياسة الخصوصية والشروط والأحكام",
			title_en: item.title_en || item.name_en || "Privacy Policy & Terms of Service",
			translated_title: lang === "en" ? item.title_en || item.title || "Privacy Policy & Terms of Service" : item.title_ar || item.title || "سياسة الخصوصية والشروط والأحكام",
			subtitle: item.subtitle || item.subtitle_ar || "خصوصيتكم وأمان بياناتكم هي أولويتنا القصوى. تعرف على كيفية حماية وإدارة بياناتكم وفق الأنظمة المعتمدة في المملكة.",
			subtitle_ar: item.subtitle_ar || item.subtitle || "خصوصيتكم وأمان بياناتكم هي أولويتنا القصوى. تعرف على كيفية حماية وإدارة بياناتكم وفق الأنظمة المعتمدة في المملكة.",
			subtitle_en: item.subtitle_en || "Your privacy and data security are our highest priority. Learn how we safeguard your personal information.",
			translated_subtitle: lang === "en" ? item.subtitle_en || item.subtitle : item.subtitle_ar || item.subtitle,
			content: item.content || item.content_ar || item.description || this.getDefaultContent("ar"),
			content_ar: item.content_ar || item.content || item.description_ar || this.getDefaultContent("ar"),
			content_en: item.content_en || item.description_en || this.getDefaultContent("en"),
			translated_content: lang === "en" ? item.content_en || item.content || this.getDefaultContent("en") : item.content_ar || item.content || this.getDefaultContent("ar"),
			is_active: item.is_active !== void 0 ? item.is_active === 1 || item.is_active === true || item.is_active === "1" : true,
			status: item.status !== void 0 ? item.status === 1 || item.status === true || item.status === "1" : true,
			badge_1_icon: item.badge_1_icon || "fa-solid fa-shield-halved",
			badge_1_title_ar: item.badge_1_title_ar || "تشفير وحماية مشددة",
			badge_1_title_en: item.badge_1_title_en || "SSL/TLS Encryption",
			badge_1_desc_ar: item.badge_1_desc_ar || "حماية كاملة لكافة البيانات والمعاملات بأحدث بروتوكولات الأمان.",
			badge_1_desc_en: item.badge_1_desc_en || "256-bit encrypted data protocols.",
			badge_2_icon: item.badge_2_icon || "fa-solid fa-user-lock",
			badge_2_title_ar: item.badge_2_title_ar || "سرية تامة للبيانات",
			badge_2_title_en: item.badge_2_title_en || "Strict Confidentiality",
			badge_2_desc_ar: item.badge_2_desc_ar || "لا نشارك أو نبيع بياناتك لأي طرف ثالث تحت أي ظرف.",
			badge_2_desc_en: item.badge_2_desc_en || "We never sell or trade your info.",
			badge_3_icon: item.badge_3_icon || "fa-solid fa-building-shield",
			badge_3_title_ar: item.badge_3_title_ar || "نظام حماية البيانات",
			badge_3_title_en: item.badge_3_title_en || "Saudi PDPL Compliant",
			badge_3_desc_ar: item.badge_3_desc_ar || "متوافق مع نظام حماية البيانات الشخصية في المملكة العربية السعودية.",
			badge_3_desc_en: item.badge_3_desc_en || "Full alignment with KSA privacy laws.",
			badge_4_icon: item.badge_4_icon || "fa-solid fa-sliders",
			badge_4_title_ar: item.badge_4_title_ar || "تحكم كامل بالبيانات",
			badge_4_title_en: item.badge_4_title_en || "Full User Rights",
			badge_4_desc_ar: item.badge_4_desc_ar || "حق مراجعة وتحديث أو حذف بياناتك في أي وقت بسهولة.",
			badge_4_desc_en: item.badge_4_desc_en || "Manage or delete your data anytime.",
			summary_title_ar: item.summary_title_ar || "ملخص موجز لأهم البنود",
			summary_title_en: item.summary_title_en || "Summary in Brief",
			summary_point_1_ar: item.summary_point_1_ar || "نجمع البيانات فقط لمعالجة وتوصيل طلباتكم بدقة.",
			summary_point_1_en: item.summary_point_1_en || "We collect data strictly to process and deliver your orders.",
			summary_point_2_ar: item.summary_point_2_ar || "لا نخزن أي بيانات بطاقات ائتمانية أو أرقام سرية مطلقا.",
			summary_point_2_en: item.summary_point_2_en || "Payment card information is never stored on our servers.",
			summary_point_3_ar: item.summary_point_3_ar || "يحق لكم في أي وقت تعديل بياناتكم أو حذف حسابكم.",
			summary_point_3_en: item.summary_point_3_en || "You have full right to edit or delete your account anytime.",
			inquiry_title_ar: item.inquiry_title_ar || "استفسارات حول الخصوصية؟",
			inquiry_title_en: item.inquiry_title_en || "Privacy Inquiries?",
			inquiry_desc_ar: item.inquiry_desc_ar || "إذا كان لديكم أي استفسار حول حماية بياناتكم أو رغبتكم في ممارسة حقوقكم، تواصلوا معنا مباشرة.",
			inquiry_desc_en: item.inquiry_desc_en || "For any questions regarding your personal data or privacy rights, please reach out to us.",
			inquiry_contact_url: item.inquiry_contact_url || "/contact-us",
			inquiry_contact_btn_ar: item.inquiry_contact_btn_ar || "تواصل مع فريق الخصوصية",
			inquiry_contact_btn_en: item.inquiry_contact_btn_en || "Contact Privacy Team",
			inquiry_whatsapp_url: item.inquiry_whatsapp_url || "https://wa.me/966500000000",
			inquiry_whatsapp_btn_ar: item.inquiry_whatsapp_btn_ar || "دعم عبر الواتساب",
			inquiry_whatsapp_btn_en: item.inquiry_whatsapp_btn_en || "WhatsApp Support",
			meta_title: item.meta_title || item.meta_title_ar || "",
			meta_title_ar: item.meta_title_ar || item.meta_title || "",
			meta_title_en: item.meta_title_en || "",
			meta_description: item.meta_description || item.meta_description_ar || "",
			meta_description_ar: item.meta_description_ar || item.meta_description || "",
			meta_description_en: item.meta_description_en || "",
			created_at: item.created_at || "",
			updated_at: item.updated_at || ""
		};
	},
	/**
	* Fallback data for Privacy Policy
	*/
	getDefaultPrivacyPolicy(lang = "ar") {
		const isEn = lang === "en";
		return {
			id: 1,
			title: isEn ? "Privacy Policy & Terms of Service" : "سياسة الخصوصية والشروط والأحكام",
			title_ar: "سياسة الخصوصية والشروط والأحكام",
			title_en: "Privacy Policy & Terms of Service",
			translated_title: isEn ? "Privacy Policy & Terms of Service" : "سياسة الخصوصية والشروط والأحكام",
			subtitle: isEn ? "Your privacy and data security are our highest priority. Learn how we safeguard your personal information." : "خصوصيتكم وأمان بياناتكم هي أولويتنا القصوى. تعرف على كيفية حماية وإدارة بياناتكم وفق الأنظمة المعتمدة في المملكة.",
			subtitle_ar: "خصوصيتكم وأمان بياناتكم هي أولويتنا القصوى. تعرف على كيفية حماية وإدارة بياناتكم وفق الأنظمة المعتمدة في المملكة.",
			subtitle_en: "Your privacy and data security are our highest priority. Learn how we safeguard your personal information.",
			translated_subtitle: isEn ? "Your privacy and data security are our highest priority. Learn how we safeguard your personal information." : "خصوصيتكم وأمان بياناتكم هي أولويتنا القصوى. تعرف على كيفية حماية وإدارة بياناتكم وفق الأنظمة المعتمدة في المملكة.",
			content_ar: this.getDefaultContent("ar"),
			content_en: this.getDefaultContent("en"),
			content: isEn ? this.getDefaultContent("en") : this.getDefaultContent("ar"),
			translated_content: isEn ? this.getDefaultContent("en") : this.getDefaultContent("ar"),
			is_active: true,
			status: true,
			badge_1_icon: "fa-solid fa-shield-halved",
			badge_1_title_ar: "تشفير وحماية مشددة",
			badge_1_title_en: "SSL/TLS Encryption",
			badge_1_desc_ar: "حماية كاملة لكافة البيانات والمعاملات بأحدث بروتوكولات الأمان.",
			badge_1_desc_en: "256-bit encrypted data protocols.",
			badge_2_icon: "fa-solid fa-user-lock",
			badge_2_title_ar: "سرية تامة للبيانات",
			badge_2_title_en: "Strict Confidentiality",
			badge_2_desc_ar: "لا نشارك أو نبيع بياناتك لأي طرف ثالث تحت أي ظرف.",
			badge_2_desc_en: "We never sell or trade your info.",
			badge_3_icon: "fa-solid fa-building-shield",
			badge_3_title_ar: "نظام حماية البيانات",
			badge_3_title_en: "Saudi PDPL Compliant",
			badge_3_desc_ar: "متوافق مع نظام حماية البيانات الشخصية في المملكة العربية السعودية.",
			badge_3_desc_en: "Full alignment with KSA privacy laws.",
			badge_4_icon: "fa-solid fa-sliders",
			badge_4_title_ar: "تحكم كامل بالبيانات",
			badge_4_title_en: "Full User Rights",
			badge_4_desc_ar: "حق مراجعة وتحديث أو حذف بياناتك في أي وقت بسهولة.",
			badge_4_desc_en: "Manage or delete your data anytime.",
			summary_title_ar: "ملخص موجز لأهم البنود",
			summary_title_en: "Summary in Brief",
			summary_point_1_ar: "نجمع البيانات فقط لمعالجة وتوصيل طلباتكم بدقة.",
			summary_point_1_en: "We collect data strictly to process and deliver your orders.",
			summary_point_2_ar: "لا نخزن أي بيانات بطاقات ائتمانية أو أرقام سرية مطلقا.",
			summary_point_2_en: "Payment card information is never stored on our servers.",
			summary_point_3_ar: "يحق لكم في أي وقت تعديل بياناتكم أو حذف حسابكم.",
			summary_point_3_en: "You have full right to edit or delete your account anytime.",
			inquiry_title_ar: "استفسارات حول الخصوصية؟",
			inquiry_title_en: "Privacy Inquiries?",
			inquiry_desc_ar: "إذا كان لديكم أي استفسار حول حماية بياناتكم أو رغبتكم في ممارسة حقوقكم، تواصلوا معنا مباشرة.",
			inquiry_desc_en: "For any questions regarding your personal data or privacy rights, please reach out to us.",
			inquiry_contact_url: "/contact-us",
			inquiry_contact_btn_ar: "تواصل مع فريق الخصوصية",
			inquiry_contact_btn_en: "Contact Privacy Team",
			inquiry_whatsapp_url: "https://wa.me/966500000000",
			inquiry_whatsapp_btn_ar: "دعم عبر الواتساب",
			inquiry_whatsapp_btn_en: "WhatsApp Support",
			meta_title_ar: "سياسة الخصوصية والأمان | متجر أسوار جدة",
			meta_title_en: "Privacy Policy & Terms | Aswar Jeddah",
			meta_description_ar: "تعرف على سياسة الخصوصية وحماية البيانات في متجر أسوار جدة للأجهزة والحلول التقنية والمنزلية.",
			meta_description_en: "Learn more about privacy policy, terms of service and data security at Aswar Jeddah store."
		};
	},
	/**
	* Rich text default content
	*/
	getDefaultContent(lang = "ar") {
		if (lang === "en") return `
<h3>1. Introduction & Commitment</h3>
<p>At <strong>Aswar Jeddah</strong>, protecting your personal data is a top priority. This Privacy Policy outlines how we collect, use, and protect your information in full compliance with the <strong>Saudi Personal Data Protection Law (PDPL)</strong> and electronic commerce regulations.</p>

<h3>2. Information We Collect</h3>
<ul>
  <li><strong>Identity & Contact Details:</strong> Name, phone number, email address, and shipping address.</li>
  <li><strong>Transaction Details:</strong> Ordered items, order history, billing address, and payment confirmation status.</li>
  <li><strong>Technical Information:</strong> IP address, browser type, device type, and cookies to ensure optimal site functionality.</li>
  <li><em>Note: We never store your full payment card details or CVV. Payments are processed through PCI-DSS certified and encrypted payment gateways.</em></li>
</ul>

<h3>3. How We Use Your Data</h3>
<ul>
  <li>To process, fulfill, and deliver your orders accurately to your doorstep.</li>
  <li>To provide official warranty service, after-sales technical support, and customer care.</li>
  <li>To send real-time order tracking updates and electronic tax invoices.</li>
  <li>To enhance store performance and deliver tailored promotions that suit your interests.</li>
</ul>

<h3>4. Data Protection & Sharing</h3>
<p>We implement stringent technical and organizational security measures (including SSL/TLS encryption). We do not sell or trade your information. Data is only shared with authorized logistics and shipping partners strictly necessary to complete your delivery.</p>

<h3>5. Your Rights & Control</h3>
<p>You reserve the right to access, review, update, or request the deletion of your personal data at any time via your account settings or by contacting our support team.</p>
`;
		return `
<h3>1. مقدمة والتزامنا بالخصوصية</h3>
<p>نولي في <strong>متجر أسوار جدة</strong> أهمية قصوى لخصوصية وسرية بياناتكم. توضح هذه السياسة كيفية جمع واستخدام وحماية البيانات الشخصية لعملائنا وزوارنا، وذلك بما يتوافق مع <strong>نظام حماية البيانات الشخصية</strong> واللوائح التنفيذية للأمن السيبراني وحماية المستهلك في المملكة العربية السعودية.</p>

<h3>2. المعلومات التي نقوم بجمعها</h3>
<ul>
  <li><strong>بيانات الهوية والتواصل:</strong> الاسم، رقم الجوال، البريد الإلكتروني، وعنوان الشحن والتوصيل.</li>
  <li><strong>بيانات العمليات والطلبات:</strong> تفاصيل المنتجات المشتراة، تاريخ وسجل الطلبات، وعناوين الفواتير.</li>
  <li><strong>البيانات التقنية:</strong> عنوان الـ IP، نوع المتصفح والجهاز، وملفات تعريف الارتباط (Cookies) لتحسين تجربة التصفح.</li>
  <li><em>ملاحظة: لا نقوم بتخزين أو حفظ أي أرقام بطاقات بنكية أو بيانات دفع سرية، حيث تتم عمليات الدفع عبر بوابات دفع معتمدة ومحمية بأعلى معايير الأمان العالمية (PCI-DSS).</em></li>
</ul>

<h3>3. الغرض من جمع البيانات واستخدامها</h3>
<ul>
  <li>معالجة الطلبات، شحن وتوصيل المشتريات إلى عنوانكم المسجل بدقة.</li>
  <li>تقديم خدمات الدعم الفني، الضمان، وخدمات ما بعد البيع.</li>
  <li>إرسال تحديثات حالة الشحنات، والفواتير الإلكترونية عبر الرسائل النصية أو البريد الإلكتروني.</li>
  <li>تحسين وتطوير أداء المتجر وتقديم عروض حصرية مخصصة تلبي اهتماماتكم.</li>
</ul>

<h3>4. حماية ومشاركة البيانات</h3>
<p>نلتزم بحماية بياناتكم باستخدام أحدث تقنيات التشفير والبروتوكولات الأمنية (SSL/TLS). ولا نقوم ببيع أو تأجير بياناتكم لأي طرف ثالث، ويقتصر استخدامها مع شركائنا الموثوقين (مثل شركات الشحن والتوصيل) بالقدر اللازم لإتمام وتوصيل طلبكم فقط.</p>

<h3>5. حقوق العميل والتحكم بالبيانات</h3>
<p>يحق لكم في أي وقت مراجعة بياناتكم الشخصية، تحديثها، أو طلب حذف حسابكم من خلال لوحة التحكم في حسابي أو بالتواصل المباشر مع فريق الدعم الفني لمتجر أسوار جدة.</p>
`;
	}
};
//#endregion
//#region composables/usePrivacyPolicy.ts
/**
* Privacy Policy Composable (usePrivacyPolicy)
* Manages reactive state for public storefront and admin dashboard.
* Includes global state persistence, cache invalidation, and multi-language support.
*/
var usePrivacyPolicy = () => {
	const { currentLanguage } = useLanguage();
	const { adminToken, adminCookie } = useAdminAuth();
	const toast = useToast();
	const getCachedData = () => {
		return null;
	};
	const policyData = useState("aswar_global_privacy_policy_data", () => {
		return privacyPolicyApiService.getDefaultPrivacyPolicy("ar");
	});
	const isLoading = ref(false);
	const isSubmitting = ref(false);
	const form = reactive({ ...privacyPolicyApiService.getDefaultPrivacyPolicy("ar") });
	const getToken = () => {
		if (adminToken?.value) return adminToken.value;
		if (adminCookie?.value) return adminCookie.value;
		return "";
	};
	const fetchPublicPrivacyPolicy = async (force = true) => {
		isLoading.value = true;
		try {
			const lang = currentLanguage?.value || "ar";
			const res = await privacyPolicyApiService.fetchPrivacyPolicy(lang, force);
			if (res?.success && res.data) {
				policyData.value = {
					...privacyPolicyApiService.getDefaultPrivacyPolicy(lang),
					...res.data
				};
				policyData.value;
			} else {
				const cached = getCachedData();
				if (cached) ;
			}
		} catch (err) {
			console.warn("[usePrivacyPolicy] Failed to fetch public privacy policy:", err);
		} finally {
			isLoading.value = false;
		}
		return policyData.value;
	};
	const fetchAdminPrivacyPolicy = async () => {
		isLoading.value = true;
		try {
			const token = getToken();
			const res = await privacyPolicyApiService.fetchAdminPrivacyPolicy(token, true);
			const def = privacyPolicyApiService.getDefaultPrivacyPolicy("ar");
			if (res?.success && res.data) {
				const data = res.data;
				policyData.value = {
					...def,
					...data
				};
				Object.keys(def).forEach((k) => {
					const val = policyData.value[k];
					if (val === void 0 || val === null || val === "") policyData.value[k] = def[k];
				});
				Object.assign(form, policyData.value);
				policyData.value;
			} else {
				const cached = getCachedData();
				if (cached) ; else {
					policyData.value = { ...def };
					Object.assign(form, def);
				}
			}
		} catch (err) {
			console.warn("[usePrivacyPolicy] Failed to fetch admin privacy policy:", err);
			const def = privacyPolicyApiService.getDefaultPrivacyPolicy("ar");
			{
				policyData.value = { ...def };
				Object.assign(form, def);
			}
		} finally {
			isLoading.value = false;
		}
		return policyData.value;
	};
	const submitAdminPrivacyPolicy = async () => {
		isSubmitting.value = true;
		try {
			const token = getToken();
			const payload = {
				_method: "PUT",
				title_ar: form.title_ar || "سياسة الخصوصية والشروط والأحكام",
				title_en: form.title_en || "Privacy Policy & Terms of Service",
				title: form.title_ar || form.title_en || "سياسة الخصوصية والشروط والأحكام",
				subtitle_ar: form.subtitle_ar || "",
				subtitle_en: form.subtitle_en || "",
				subtitle: form.subtitle_ar || form.subtitle_en || "",
				content_ar: form.content_ar || "",
				content_en: form.content_en || "",
				content: form.content_ar || form.content_en || "",
				description_ar: form.content_ar || "",
				description_en: form.content_en || "",
				is_active: form.is_active ? 1 : 0,
				status: form.is_active ? 1 : 0,
				badge_1_icon: form.badge_1_icon || "fa-solid fa-shield-halved",
				badge_1_title_ar: form.badge_1_title_ar || "",
				badge_1_title_en: form.badge_1_title_en || "",
				badge_1_desc_ar: form.badge_1_desc_ar || "",
				badge_1_desc_en: form.badge_1_desc_en || "",
				badge_2_icon: form.badge_2_icon || "fa-solid fa-user-lock",
				badge_2_title_ar: form.badge_2_title_ar || "",
				badge_2_title_en: form.badge_2_title_en || "",
				badge_2_desc_ar: form.badge_2_desc_ar || "",
				badge_2_desc_en: form.badge_2_desc_en || "",
				badge_3_icon: form.badge_3_icon || "fa-solid fa-building-shield",
				badge_3_title_ar: form.badge_3_title_ar || "",
				badge_3_title_en: form.badge_3_title_en || "",
				badge_3_desc_ar: form.badge_3_desc_ar || "",
				badge_3_desc_en: form.badge_3_desc_en || "",
				badge_4_icon: form.badge_4_icon || "fa-solid fa-sliders",
				badge_4_title_ar: form.badge_4_title_ar || "",
				badge_4_title_en: form.badge_4_title_en || "",
				badge_4_desc_ar: form.badge_4_desc_ar || "",
				badge_4_desc_en: form.badge_4_desc_en || "",
				summary_title_ar: form.summary_title_ar || "",
				summary_title_en: form.summary_title_en || "",
				summary_point_1_ar: form.summary_point_1_ar || "",
				summary_point_1_en: form.summary_point_1_en || "",
				summary_point_2_ar: form.summary_point_2_ar || "",
				summary_point_2_en: form.summary_point_2_en || "",
				summary_point_3_ar: form.summary_point_3_ar || "",
				summary_point_3_en: form.summary_point_3_en || "",
				inquiry_title_ar: form.inquiry_title_ar || "",
				inquiry_title_en: form.inquiry_title_en || "",
				inquiry_desc_ar: form.inquiry_desc_ar || "",
				inquiry_desc_en: form.inquiry_desc_en || "",
				inquiry_contact_url: form.inquiry_contact_url || "/contact-us",
				inquiry_contact_btn_ar: form.inquiry_contact_btn_ar || "",
				inquiry_contact_btn_en: form.inquiry_contact_btn_en || "",
				inquiry_whatsapp_url: form.inquiry_whatsapp_url || "https://wa.me/966500000000",
				inquiry_whatsapp_btn_ar: form.inquiry_whatsapp_btn_ar || "",
				inquiry_whatsapp_btn_en: form.inquiry_whatsapp_btn_en || "",
				meta_title_ar: form.meta_title_ar || form.meta_title || "",
				meta_title_en: form.meta_title_en || "",
				meta_title: form.meta_title_ar || form.meta_title || "",
				meta_description_ar: form.meta_description_ar || form.meta_description || "",
				meta_description_en: form.meta_description_en || "",
				meta_description: form.meta_description_ar || form.meta_description || ""
			};
			const fd = new FormData();
			Object.entries(payload).forEach(([k, v]) => {
				fd.append(k, String(v));
			});
			const res = await privacyPolicyApiService.updateAdminPrivacyPolicy(token, fd);
			if (res?.success) {
				policyData.value = {
					...form,
					...res.data || {}
				};
				Object.assign(form, policyData.value);
				policyData.value;
				toast.success(res.message || "تم حفظ وتحديث سياسة الخصوصية بنجاح!");
				return { success: true };
			} else throw new Error(res?.message || "فشل حفظ التعديلات");
		} catch (err) {
			toast.error(err.data?.message || err.message || "حدث خطأ أثناء حفظ سياسة الخصوصية");
			throw err;
		} finally {
			isSubmitting.value = false;
		}
	};
	const displayTitle = computed(() => {
		return currentLanguage?.value === "en" ? policyData.value.title_en || policyData.value.title_ar || policyData.value.title || "Privacy Policy & Terms" : policyData.value.title_ar || policyData.value.title || policyData.value.title_en || "سياسة الخصوصية والشروط والأحكام";
	});
	const displaySubtitle = computed(() => {
		return currentLanguage?.value === "en" ? policyData.value.subtitle_en || policyData.value.subtitle_ar || policyData.value.subtitle || "Your privacy and data security are our highest priority." : policyData.value.subtitle_ar || policyData.value.subtitle || policyData.value.subtitle_en || "خصوصيتكم وأمان بياناتكم هي أولويتنا القصوى وفق الأنظمة المعتمدة في المملكة.";
	});
	return {
		policyData,
		form,
		isLoading,
		isSubmitting,
		fetchPublicPrivacyPolicy,
		fetchAdminPrivacyPolicy,
		submitAdminPrivacyPolicy,
		displayTitle,
		displaySubtitle,
		displayContent: computed(() => {
			return currentLanguage?.value === "en" ? policyData.value.content_en || policyData.value.content_ar || policyData.value.content || "" : policyData.value.content_ar || policyData.value.content || policyData.value.content_en || "";
		}),
		displayBadges: computed(() => {
			const isEn = currentLanguage?.value === "en";
			const d = policyData.value;
			return [
				{
					id: 1,
					icon: d.badge_1_icon || "fa-solid fa-shield-halved",
					title: isEn ? d.badge_1_title_en || "SSL/TLS Encryption" : d.badge_1_title_ar || "تشفير وحماية مشددة",
					desc: isEn ? d.badge_1_desc_en || "256-bit encrypted data protocols" : d.badge_1_desc_ar || "حماية كاملة لكافة البيانات والمعاملات"
				},
				{
					id: 2,
					icon: d.badge_2_icon || "fa-solid fa-user-lock",
					title: isEn ? d.badge_2_title_en || "Strict Confidentiality" : d.badge_2_title_ar || "سرية تامة للبيانات",
					desc: isEn ? d.badge_2_desc_en || "We never sell or trade your info" : d.badge_2_desc_ar || "لا نشارك أو نبيع بياناتك لأي طرف"
				},
				{
					id: 3,
					icon: d.badge_3_icon || "fa-solid fa-building-shield",
					title: isEn ? d.badge_3_title_en || "Saudi PDPL Compliant" : d.badge_3_title_ar || "نظام حماية البيانات",
					desc: isEn ? d.badge_3_desc_en || "Full alignment with KSA privacy laws" : d.badge_3_desc_ar || "متوافق مع أنظمة حماية البيانات في المملكة"
				},
				{
					id: 4,
					icon: d.badge_4_icon || "fa-solid fa-sliders",
					title: isEn ? d.badge_4_title_en || "Full User Rights" : d.badge_4_title_ar || "تحكم كامل بالبيانات",
					desc: isEn ? d.badge_4_desc_en || "Manage or delete your data anytime" : d.badge_4_desc_ar || "حق مراجعة وتحديث أو حذف بياناتك"
				}
			];
		}),
		displaySummaryTitle: computed(() => {
			return currentLanguage?.value === "en" ? policyData.value.summary_title_en || "Summary in Brief" : policyData.value.summary_title_ar || "ملخص موجز لأهم البنود";
		}),
		displaySummaryPoints: computed(() => {
			const isEn = currentLanguage?.value === "en";
			const d = policyData.value;
			return [
				isEn ? d.summary_point_1_en || "We collect data strictly to process and deliver your orders." : d.summary_point_1_ar || "نجمع البيانات فقط لمعالجة وتوصيل طلباتكم بدقة.",
				isEn ? d.summary_point_2_en || "Payment card information is never stored on our servers." : d.summary_point_2_ar || "لا نخزن أي بيانات بطاقات ائتمانية أو أرقام سرية مطلقا.",
				isEn ? d.summary_point_3_en || "You have full right to edit or delete your account anytime." : d.summary_point_3_ar || "يحق لكم في أي وقت تعديل بياناتكم أو حذف حسابكم."
			].filter(Boolean);
		}),
		displayInquiryBox: computed(() => {
			const isEn = currentLanguage?.value === "en";
			const d = policyData.value;
			return {
				title: isEn ? d.inquiry_title_en || "Privacy Inquiries?" : d.inquiry_title_ar || "استفسارات حول الخصوصية؟",
				desc: isEn ? d.inquiry_desc_en || "For any questions regarding your personal data or privacy rights, please reach out to us." : d.inquiry_desc_ar || "إذا كان لديكم أي استفسار حول حماية بياناتكم أو رغبتكم في ممارسة حقوقكم، تواصلوا معنا مباشرة.",
				contactUrl: d.inquiry_contact_url || "/contact-us",
				contactBtn: isEn ? d.inquiry_contact_btn_en || "Contact Privacy Team" : d.inquiry_contact_btn_ar || "تواصل مع فريق الخصوصية",
				whatsappUrl: d.inquiry_whatsapp_url || "https://wa.me/966500000000",
				whatsappBtn: isEn ? d.inquiry_whatsapp_btn_en || "WhatsApp Support" : d.inquiry_whatsapp_btn_ar || "دعم عبر الواتساب"
			};
		}),
		displayMetaTitle: computed(() => {
			return currentLanguage?.value === "en" ? policyData.value.meta_title_en || policyData.value.meta_title_ar || policyData.value.meta_title || `${displayTitle.value} | Aswar Jeddah` : policyData.value.meta_title_ar || policyData.value.meta_title || `${displayTitle.value} | متجر أسوار جدة`;
		}),
		displayMetaDescription: computed(() => {
			return currentLanguage?.value === "en" ? policyData.value.meta_description_en || policyData.value.meta_description_ar || policyData.value.meta_description || displaySubtitle.value : policyData.value.meta_description_ar || policyData.value.meta_description || displaySubtitle.value;
		})
	};
};

export { usePrivacyPolicy as u };
//# sourceMappingURL=usePrivacyPolicy-GSsCFP9x.mjs.map
