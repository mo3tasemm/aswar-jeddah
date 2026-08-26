import { f as useAdminAuth, h as useState, $ as $fetch$2, a as useToast } from '../virtual/entry.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { ref, reactive, computed } from 'vue';

//#region services/aboutUsApiService.ts
var getApiBaseUrl = () => {
	return (process.env.NUXT_PUBLIC_API_BASE || "https://ai-agunt.elbakry2.com/api/v1").replace(/\/$/, "");
};
var aboutUsApiService = {
	/**
	* 1. GET Public About Us Data (supports lang parameter, cache-busting, and Accept-Language header)
	*/
	async fetchAboutUs(lang = "ar", force = false) {
		const apiBase = getApiBaseUrl();
		const endpoints = [
			`${apiBase}/about-us`,
			`${apiBase}/about_us`,
			`${apiBase}/admin/about-us`,
			`${apiBase}/admin/about_us`
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
			const raw = response?.data?.data || response?.data || response?.about_us || response?.item || response;
			if (raw && typeof raw === "object") return {
				success: true,
				data: this.normalizeAboutUs(raw, lang)
			};
		} catch (err) {}
		return {
			success: true,
			data: this.getDefaultAboutUs(lang)
		};
	},
	/**
	* 2. GET Admin About Us Data
	*/
	async fetchAdminAboutUs(token, force = false) {
		const apiBase = getApiBaseUrl();
		const endpoints = [
			`${apiBase}/admin/about-us`,
			`${apiBase}/admin/about_us`,
			`${apiBase}/about-us`,
			`${apiBase}/about_us`
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
			const raw = response?.data?.data || response?.data || response?.about_us || response?.item || response;
			if (raw && typeof raw === "object") return {
				success: true,
				data: this.normalizeAboutUs(raw, "ar")
			};
		} catch (err) {}
		return {
			success: true,
			data: this.getDefaultAboutUs("ar")
		};
	},
	/**
	* Resolve Image URL to absolute full URL
	*/
	resolveImageUrl(img) {
		if (!img) return "";
		if (typeof img === "object") {
			if (img.full_url) return this.resolveImageUrl(img.full_url);
			if (img.url) return this.resolveImageUrl(img.url);
			if (img.path) return this.resolveImageUrl(img.path);
			if (img.src) return this.resolveImageUrl(img.src);
		}
		const str = String(img).trim();
		if (!str || str === "null" || str === "undefined") return "";
		if (str.startsWith("http://") || str.startsWith("https://") || str.startsWith("blob:") || str.startsWith("data:")) return str;
		const baseHost = getApiBaseUrl().replace(/\/api\/v1\/?$/, "");
		const cleanPath = str.replace(/^\/+/, "");
		if (cleanPath.startsWith("storage/")) return `${baseHost}/${cleanPath}`;
		return `${baseHost}/storage/${cleanPath}`;
	},
	/**
	* Upload an image to the dedicated admin upload endpoint
	*/
	async uploadImage(file, token) {
		const apiBase = getApiBaseUrl();
		const endpoints = [
			`${apiBase}/admin/upload-image`,
			`${apiBase}/admin/media/upload`,
			`${apiBase}/admin/upload`,
			`${apiBase}/upload-image`,
			`${apiBase}/media/upload`
		];
		const fd = new FormData();
		fd.append("image", file);
		fd.append("file", file);
		let lastError = null;
		for (const url of endpoints) try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"X-Requested-With": "XMLHttpRequest"
				},
				body: fd
			});
			const json = await response.json().catch(() => ({}));
			if (response.ok && (json.success !== false || json.status === "success" || json.data || json.url || json.path || json.image)) {
				const payload = json.data || json;
				const rawUrl = typeof payload === "string" ? payload : payload.url || payload.full_url || payload.path || payload.image || payload.file || "";
				const fullUrl = this.resolveImageUrl(payload.full_url || rawUrl || payload);
				return {
					success: true,
					url: rawUrl || fullUrl,
					full_url: fullUrl || rawUrl,
					path: payload.path || rawUrl
				};
			} else if (!response.ok) lastError = json;
		} catch (err) {
			lastError = err;
		}
		console.warn("[aboutUsApiService] uploadImage failed on all endpoints:", lastError);
		throw new Error(lastError?.message || lastError?.data?.message || "فشل رفع الصورة على الخادم");
	},
	/**
	* 3. POST / PUT Update Admin About Us (FormData or JSON)
	*/
	async updateAdminAboutUs(token, payload) {
		const apiBase = getApiBaseUrl();
		const endpoints = [
			{
				url: `${apiBase}/admin/about-us`,
				method: "POST"
			},
			{
				url: `${apiBase}/admin/about-us`,
				method: "PUT"
			},
			{
				url: `${apiBase}/admin/about_us`,
				method: "POST"
			},
			{
				url: `${apiBase}/admin/about_us`,
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
				const raw = json.data?.data || json.data || json.about_us || json.item || json;
				return {
					success: true,
					message: json.message || json.data?.message || "تم حفظ وتحديث بيانات صفحة من نحن بنجاح!",
					data: this.normalizeAboutUs(raw, "ar")
				};
			} else if (!response.ok) lastError = json;
		} catch (err) {
			lastError = err;
		}
		if (lastError) {
			console.error("[aboutUsApiService] updateAdminAboutUs error:", lastError);
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
	normalizeAboutUs(raw, lang = "ar") {
		if (!raw || typeof raw !== "object") return this.getDefaultAboutUs(lang);
		let item = raw;
		if (item.data && typeof item.data === "object" && !Array.isArray(item.data)) item = item.data;
		if (item.about_us && typeof item.about_us === "object") item = item.about_us;
		const banner_image = item.banner_image || item.banner || "";
		const banner_image_full_url = this.resolveImageUrl(item.banner_image_full_url || item.banner_image || item.banner_full_url || item.banner);
		const story_image = item.story_image || item.image || "";
		const story_image_full_url = this.resolveImageUrl(item.story_image_full_url || item.story_image || item.story_full_url || item.image_full_url || item.image);
		let values = [];
		if (Array.isArray(item.values)) values = item.values.map((v, idx) => ({
			id: v.id || idx + 1,
			icon: v.icon || v.icon_class || "fa-solid fa-star",
			title_ar: v.title_ar || v.title || "",
			title_en: v.title_en || v.title || "",
			title: lang === "en" ? v.title_en || v.title || v.title_ar : v.title_ar || v.title || v.title_en,
			desc_ar: v.desc_ar || v.description_ar || v.desc || v.description || "",
			desc_en: v.desc_en || v.description_en || v.desc || v.description || "",
			description: lang === "en" ? v.desc_en || v.description_en || v.desc || v.description : v.desc_ar || v.description_ar || v.desc || v.description
		}));
		else if (typeof item.values === "string") try {
			const parsed = JSON.parse(item.values);
			if (Array.isArray(parsed)) values = parsed;
		} catch (e) {}
		return {
			id: item.id || 1,
			title: item.title || item.title_ar || item.name || "عن أسوار جدة",
			title_ar: item.title_ar || item.title || "عن أسوار جدة",
			title_en: item.title_en || item.name_en || "About Aswar Jeddah",
			translated_title: lang === "en" ? item.title_en || item.title || "About Aswar Jeddah" : item.title_ar || item.title || "عن أسوار جدة",
			subtitle: item.subtitle || item.subtitle_ar || "وجهتكم الرائدة للأجهزة والحلول التقنية والمنزلية في المملكة",
			subtitle_ar: item.subtitle_ar || item.subtitle || "وجهتكم الرائدة للأجهزة والحلول التقنية والمنزلية في المملكة",
			subtitle_en: item.subtitle_en || "Your leading destination for tech, appliances and smart solutions in KSA",
			translated_subtitle: lang === "en" ? item.subtitle_en || item.subtitle : item.subtitle_ar || item.subtitle,
			story_title: item.story_title || item.story_title_ar || "قصة نجاحنا وشغفنا",
			story_title_ar: item.story_title_ar || item.story_title || "قصة نجاحنا وشغفنا",
			story_title_en: item.story_title_en || "Our Story & Passion",
			story_content: item.story_content || item.story_content_ar || "<p>تأسست أسوار جدة برؤية طموحة تهدف إلى تقديم أفضل المنتجات التقنية والأجهزة المنزلية وحلول الأمن المتطورة بأعلى معايير الجودة والضمان المعتمد وبأسعار تنافسية تلبي تطلعات عملائنا في كافة أرجاء المملكة.</p>",
			story_content_ar: item.story_content_ar || item.story_content || "<p>تأسست أسوار جدة برؤية طموحة تهدف إلى تقديم أفضل المنتجات التقنية والأجهزة المنزلية وحلول الأمن المتطورة بأعلى معايير الجودة والضمان المعتمد وبأسعار تنافسية تلبي تطلعات عملائنا في كافة أرجاء المملكة.</p>",
			story_content_en: item.story_content_en || "<p>Aswar Jeddah was founded with an ambitious vision to provide premium technology, home appliances, and security solutions with certified quality and warranty across the Kingdom.</p>",
			story_image,
			story_image_full_url,
			vision_title: item.vision_title || item.vision_title_ar || "رؤيتنا",
			vision_title_ar: item.vision_title_ar || item.vision_title || "رؤيتنا",
			vision_title_en: item.vision_title_en || "Our Vision",
			vision_content: item.vision_content || item.vision_content_ar || "أن نكون الخيار الأول والموثوق لكل منزل وشركة في المملكة عند البحث عن التكنولوجيا الحديثة والأجهزة المبتكرة.",
			vision_content_ar: item.vision_content_ar || item.vision_content || "أن نكون الخيار الأول والموثوق لكل منزل وشركة في المملكة عند البحث عن التكنولوجيا الحديثة والأجهزة المبتكرة.",
			vision_content_en: item.vision_content_en || "To be the first and most trusted choice for every home and business in the Kingdom seeking innovative technologies.",
			mission_title: item.mission_title || item.mission_title_ar || "رسالتنا",
			mission_title_ar: item.mission_title_ar || item.mission_title || "رسالتنا",
			mission_title_en: item.mission_title_en || "Our Mission",
			mission_content: item.mission_content || item.mission_content_ar || "توفير تجربة تسوق إلكترونية سلسة وموثوقة، مع تقديم منتجات أصلية 100%، وخدمة عملاء استثنائية، وضمان حقيقي يضمن راحة بال العميل.",
			mission_content_ar: item.mission_content_ar || item.mission_content || "توفير تجربة تسوق إلكترونية سلسة وموثوقة، مع تقديم منتجات أصلية 100%، وخدمة عملاء استثنائية، وضمان حقيقي يضمن راحة بال العميل.",
			mission_content_en: item.mission_content_en || "Delivering a seamless shopping experience with 100% genuine products, exceptional customer service, and certified warranties.",
			banner_image,
			banner_image_full_url,
			stats_customers: item.stats_customers || item.stats?.customers || item.stats_1_value || "25,000+",
			stats_customers_label_ar: item.stats_customers_label_ar || item.stats_1_title_ar || "عميل سعيد وموثوق",
			stats_customers_label_en: item.stats_customers_label_en || item.stats_1_title_en || "Satisfied Customers",
			stats_customers_icon: item.stats_customers_icon || item.stats_1_icon || "fa-solid fa-users",
			stats_products: item.stats_products || item.stats?.products || item.stats_2_value || "1,500+",
			stats_products_label_ar: item.stats_products_label_ar || item.stats_2_title_ar || "منتج أصلي معتمد",
			stats_products_label_en: item.stats_products_label_en || item.stats_2_title_en || "Certified Products",
			stats_products_icon: item.stats_products_icon || item.stats_2_icon || "fa-solid fa-boxes-stacked",
			stats_experience: item.stats_experience || item.stats?.experience || item.stats_3_value || "10+",
			stats_experience_label_ar: item.stats_experience_label_ar || item.stats_3_title_ar || "سنوات من الخبرة",
			stats_experience_label_en: item.stats_experience_label_en || item.stats_3_title_en || "Years of Experience",
			stats_experience_icon: item.stats_experience_icon || item.stats_3_icon || "fa-solid fa-award",
			stats_awards: item.stats_awards || item.stats?.awards || item.stats_warranty || item.stats_4_value || "100%",
			stats_awards_label_ar: item.stats_awards_label_ar || item.stats_4_title_ar || "ضمان وجودة معتمدة",
			stats_awards_label_en: item.stats_awards_label_en || item.stats_4_title_en || "Warranty & Quality",
			stats_awards_icon: item.stats_awards_icon || item.stats_4_icon || "fa-solid fa-shield",
			stats_warranty: item.stats_warranty || item.stats_awards || "100%",
			stats_excellence: item.stats_excellence || "99.8%",
			stats_satisfaction: item.stats_satisfaction || "99%",
			features_badge_ar: item.features_badge_ar || "التزاماتنا لعملائنا",
			features_badge_en: item.features_badge_en || "Store Commitments",
			features_title_ar: item.features_title_ar || "لماذا يفضل العملاء التسوق معنا؟",
			features_title_en: item.features_title_en || "Why Shop With Aswar Jeddah?",
			values,
			feature_1_title_ar: item.feature_1_title_ar || values[0]?.title_ar || "منتجات أصلية 100%",
			feature_1_title_en: item.feature_1_title_en || values[0]?.title_en || "100% Genuine Products",
			feature_1_desc_ar: item.feature_1_desc_ar || values[0]?.desc_ar || values[0]?.description_ar || "نوفر كافة الأجهزة مباشرة من الوكلاء والمصادر المعتمدة",
			feature_1_desc_en: item.feature_1_desc_en || values[0]?.desc_en || values[0]?.description_en || "Direct from certified brands and authorized distributors",
			feature_1_icon: item.feature_1_icon || values[0]?.icon || "fa-solid fa-shield",
			feature_2_title_ar: item.feature_2_title_ar || values[1]?.title_ar || "شحن سريع وآمن",
			feature_2_title_en: item.feature_2_title_en || values[1]?.title_en || "Fast Kingdom Shipping",
			feature_2_desc_ar: item.feature_2_desc_ar || values[1]?.desc_ar || values[1]?.description_ar || "توصيل موثوق ومحمي لكافة مدن ومناطق المملكة",
			feature_2_desc_en: item.feature_2_desc_en || values[1]?.desc_en || values[1]?.description_en || "Reliable door-to-door delivery across all regions of KSA",
			feature_2_icon: item.feature_2_icon || values[1]?.icon || "fa-solid fa-truck-fast",
			feature_3_title_ar: item.feature_3_title_ar || values[2]?.title_ar || "طرق دفع متعددة وآمنة",
			feature_3_title_en: item.feature_3_title_en || values[2]?.title_en || "Secure Payment Options",
			feature_3_desc_ar: item.feature_3_desc_ar || values[2]?.desc_ar || values[2]?.description_ar || "مدى، فيزا، ماستركارد، آبل باي وخيارات التقسيط الميسر",
			feature_3_desc_en: item.feature_3_desc_en || values[2]?.desc_en || values[2]?.description_en || "Support for Mada, Apple Pay, Visa, and installments",
			feature_3_icon: item.feature_3_icon || values[2]?.icon || "fa-solid fa-credit-card",
			feature_4_title_ar: item.feature_4_title_ar || values[3]?.title_ar || "خدمة عملاء متخصصة",
			feature_4_title_en: item.feature_4_title_en || values[3]?.title_en || "Dedicated Support",
			feature_4_desc_ar: item.feature_4_desc_ar || values[3]?.desc_ar || values[3]?.description_ar || "فريق متكامل للإجابة على استفساراتكم ومتابعة طلباتكم",
			feature_4_desc_en: item.feature_4_desc_en || values[3]?.desc_en || values[3]?.description_en || "Our technical support team is ready to assist you anytime",
			feature_4_icon: item.feature_4_icon || values[3]?.icon || "fa-solid fa-headset",
			cta_title_ar: item.cta_title_ar || "اكتشف آلاف الأجهزة والحلول التقنية المعتمدة",
			cta_title_en: item.cta_title_en || "Discover Thousands of Verified Products",
			cta_desc_ar: item.cta_desc_ar || "تسوق بأعلى مستويات الأمان والضمان المعتمد في كافة أنحاء المملكة.",
			cta_desc_en: item.cta_desc_en || "Shop with complete peace of mind with our official warranties.",
			cta_btn_ar: item.cta_btn_ar || "تسوق المنتجات الآن",
			cta_btn_en: item.cta_btn_en || "Browse All Products",
			cta_url: item.cta_url || "/shop",
			meta_title: item.meta_title || "",
			meta_description: item.meta_description || ""
		};
	},
	/**
	* Fallback data
	*/
	getDefaultAboutUs(lang = "ar") {
		const isEn = lang === "en";
		return {
			id: 1,
			title: isEn ? "About Aswar Jeddah" : "عن أسوار جدة",
			title_ar: "عن أسوار جدة",
			title_en: "About Aswar Jeddah",
			translated_title: isEn ? "About Aswar Jeddah" : "عن أسوار جدة",
			subtitle: isEn ? "Your leading destination for smart tech, security & home appliances" : "وجهتكم الرائدة للأجهزة والحلول التقنية والمنزلية في المملكة",
			subtitle_ar: "وجهتكم الرائدة للأجهزة والحلول التقنية والمنزلية في المملكة",
			subtitle_en: "Your leading destination for smart tech, security & home appliances",
			translated_subtitle: isEn ? "Your leading destination for smart tech, security & home appliances" : "وجهتكم الرائدة للأجهزة والحلول التقنية والمنزلية في المملكة",
			story_title: isEn ? "Our Story & Passion" : "قصة نجاحنا وشغفنا",
			story_title_ar: "قصة نجاحنا وشغفنا",
			story_title_en: "Our Story & Passion",
			story_content: isEn ? "<p>Aswar Jeddah was founded with an ambitious vision to provide premium technology, home appliances, and smart solutions with certified quality and warranty across the Kingdom. We take pride in serving thousands of satisfied customers with unmatched care.</p>" : "<p>تأسست <strong>أسوار جدة</strong> برؤية طموحة تهدف إلى تقديم أفضل المنتجات التقنية والأجهزة المنزلية وحلول الأمن المتطورة بأعلى معايير الجودة والضمان المعتمد وبأسعار تنافسية تلبي تطلعات عملائنا في كافة أرجاء المملكة.</p><p>نحرص دائماً على اختيار أفضل العلامات التجارية العالمية وتقديم خدمات دعم فني وضمان متكامل بعد البيع لضمان رضاكم الدائم.</p>",
			story_content_ar: "<p>تأسست <strong>أسوار جدة</strong> برؤية طموحة تهدف إلى تقديم أفضل المنتجات التقنية والأجهزة المنزلية وحلول الأمن المتطورة بأعلى معايير الجودة والضمان المعتمد وبأسعار تنافسية تلبي تطلعات عملائنا في كافة أرجاء المملكة.</p>",
			story_content_en: "<p>Aswar Jeddah was founded with an ambitious vision to provide premium technology, home appliances, and smart solutions with certified quality and warranty across the Kingdom.</p>",
			story_image: "",
			story_image_full_url: "",
			vision_title: isEn ? "Our Vision" : "رؤيتنا",
			vision_title_ar: "رؤيتنا",
			vision_title_en: "Our Vision",
			vision_content: isEn ? "To be the first and most trusted choice for every home and business in the Kingdom seeking innovative technologies and smart living." : "أن نكون الخيار الأول والموثوق لكل منزل وشركة في المملكة عند البحث عن التكنولوجيا الحديثة والأجهزة المبتكرة.",
			vision_content_ar: "أن نكون الخيار الأول والموثوق لكل منزل وشركة في المملكة عند البحث عن التكنولوجيا الحديثة والأجهزة المبتكرة.",
			vision_content_en: "To be the first and most trusted choice for every home and business in the Kingdom seeking innovative technologies and smart living.",
			mission_title: isEn ? "Our Mission" : "رسالتنا",
			mission_title_ar: "رسالتنا",
			mission_title_en: "Our Mission",
			mission_content: isEn ? "Delivering a seamless shopping experience with 100% genuine products, exceptional customer service, and certified warranties." : "توفير تجربة تسوق إلكترونية سلسة وموثوقة، مع تقديم منتجات أصلية 100%، وخدمة عملاء استثنائية، وضمان حقيقي يضمن راحة بال العميل.",
			mission_content_ar: "توفير تجربة تسوق إلكترونية سلسة وموثوقة، مع تقديم منتجات أصلية 100%، وخدمة عملاء استثنائية، وضمان حقيقي يضمن راحة بال العميل.",
			mission_content_en: "Delivering a seamless shopping experience with 100% genuine products, exceptional customer service, and certified warranties.",
			banner_image: "",
			banner_image_full_url: "",
			stats_customers: "25,000+",
			stats_customers_label_ar: "عميل سعيد وموثوق",
			stats_customers_label_en: "Satisfied Customers",
			stats_customers_icon: "fa-solid fa-users",
			stats_products: "1,500+",
			stats_products_label_ar: "منتج أصلي معتمد",
			stats_products_label_en: "Certified Products",
			stats_products_icon: "fa-solid fa-boxes-stacked",
			stats_experience: "10+",
			stats_experience_label_ar: "سنوات من الخبرة",
			stats_experience_label_en: "Years of Experience",
			stats_experience_icon: "fa-solid fa-award",
			stats_awards: "100%",
			stats_awards_label_ar: "ضمان وجودة معتمدة",
			stats_awards_label_en: "Warranty & Quality",
			stats_awards_icon: "fa-solid fa-shield",
			stats_warranty: "100%",
			stats_excellence: "99.8%",
			stats_satisfaction: "99%",
			features_badge_ar: "التزاماتنا لعملائنا",
			features_badge_en: "Store Commitments",
			features_title_ar: "لماذا يفضل العملاء التسوق معنا؟",
			features_title_en: "Why Shop With Aswar Jeddah?",
			values: [],
			feature_1_title_ar: "منتجات أصلية 100%",
			feature_1_title_en: "100% Genuine Products",
			feature_1_desc_ar: "نوفر كافة الأجهزة مباشرة من الوكلاء والمصادر المعتمدة",
			feature_1_desc_en: "Direct from certified brands and authorized distributors",
			feature_1_icon: "fa-solid fa-shield",
			feature_2_title_ar: "شحن سريع وآمن",
			feature_2_title_en: "Fast Kingdom Shipping",
			feature_2_desc_ar: "توصيل موثوق ومحمي لكافة مدن ومناطق المملكة",
			feature_2_desc_en: "Reliable door-to-door delivery across all regions of KSA",
			feature_2_icon: "fa-solid fa-truck-fast",
			feature_3_title_ar: "طرق دفع متعددة وآمنة",
			feature_3_title_en: "Secure Payment Options",
			feature_3_desc_ar: "مدى، فيزا، ماستركارد، آبل باي وخيارات التقسيط الميسر",
			feature_3_desc_en: "Support for Mada, Apple Pay, Visa, and installments",
			feature_3_icon: "fa-solid fa-credit-card",
			feature_4_title_ar: "خدمة عملاء متخصصة",
			feature_4_title_en: "Dedicated Support",
			feature_4_desc_ar: "فريق متكامل للإجابة على استفساراتكم ومتابعة طلباتكم",
			feature_4_desc_en: "Our technical support team is ready to assist you anytime",
			feature_4_icon: "fa-solid fa-headset",
			cta_title_ar: "اكتشف آلاف الأجهزة والحلول التقنية المعتمدة",
			cta_title_en: "Discover Thousands of Verified Products",
			cta_desc_ar: "تسوق بأعلى مستويات الأمان والضمان المعتمد في كافة أنحاء المملكة.",
			cta_desc_en: "Shop with complete peace of mind with our official warranties.",
			cta_btn_ar: "تسوق المنتجات الآن",
			cta_btn_en: "Browse All Products",
			cta_url: "/shop"
		};
	}
};
//#endregion
//#region composables/useAboutUs.ts
var useAboutUs = () => {
	const { currentLanguage } = useLanguage();
	const { adminToken, adminCookie } = useAdminAuth();
	const toast = useToast();
	const getCachedData = () => {
		return null;
	};
	const aboutData = useState("aswar_global_about_us_data", () => {
		return aboutUsApiService.getDefaultAboutUs("ar");
	});
	const isLoading = ref(false);
	const isSubmitting = ref(false);
	const form = reactive({ ...aboutUsApiService.getDefaultAboutUs("ar") });
	const bannerFile = ref(null);
	const bannerPreview = ref("");
	const storyFile = ref(null);
	const storyPreview = ref("");
	const getToken = () => {
		if (adminToken?.value) return adminToken.value;
		if (adminCookie?.value) return adminCookie.value;
		return "";
	};
	const fetchPublicAboutUs = async (force = true) => {
		isLoading.value = true;
		try {
			const lang = currentLanguage?.value || "ar";
			const res = await aboutUsApiService.fetchAboutUs(lang, force);
			if (res?.success && res.data) {
				aboutData.value = {
					...aboutUsApiService.getDefaultAboutUs(lang),
					...res.data
				};
				aboutData.value;
			} else {
				const cached = getCachedData();
				if (cached) ;
			}
		} catch (err) {
			console.warn("[useAboutUs] Failed to fetch public about us:", err);
		} finally {
			isLoading.value = false;
		}
		return aboutData.value;
	};
	const fetchAdminAboutUs = async () => {
		isLoading.value = true;
		try {
			const token = getToken();
			const res = await aboutUsApiService.fetchAdminAboutUs(token);
			if (res?.success && res.data) {
				const data = res.data;
				aboutData.value = {
					...aboutUsApiService.getDefaultAboutUs("ar"),
					...data
				};
				Object.assign(form, aboutData.value);
				const bannerUrl = data.banner_image_full_url || aboutUsApiService.resolveImageUrl(data.banner_image);
				if (bannerUrl) {
					bannerPreview.value = bannerUrl;
					form.banner_image_full_url = bannerUrl;
				}
				const storyUrl = data.story_image_full_url || aboutUsApiService.resolveImageUrl(data.story_image);
				if (storyUrl) {
					storyPreview.value = storyUrl;
					form.story_image_full_url = storyUrl;
				}
				aboutData.value;
			} else {
				const cached = getCachedData();
				if (cached) ;
			}
		} catch (err) {
			console.warn("[useAboutUs] Failed to fetch admin about us:", err);
		} finally {
			isLoading.value = false;
		}
		return aboutData.value;
	};
	const handleBannerFileChange = (file) => {
		bannerFile.value = file;
		if (file) {
			bannerPreview.value = URL.createObjectURL(file);
			form.banner_image_full_url = bannerPreview.value;
		}
	};
	const handleStoryFileChange = (file) => {
		storyFile.value = file;
		if (file) {
			storyPreview.value = URL.createObjectURL(file);
			form.story_image_full_url = storyPreview.value;
		}
	};
	const submitAdminAboutUs = async () => {
		isSubmitting.value = true;
		try {
			const token = getToken();
			if (bannerFile.value instanceof File) try {
				const uploadRes = await aboutUsApiService.uploadImage(bannerFile.value, token);
				if (uploadRes?.url || uploadRes?.full_url) {
					form.banner_image = uploadRes.url || uploadRes.full_url;
					form.banner_image_full_url = uploadRes.full_url || uploadRes.url;
					bannerPreview.value = uploadRes.full_url || uploadRes.url;
				}
			} catch (uploadErr) {
				console.warn("[useAboutUs] Upload banner image via dedicated endpoint failed:", uploadErr);
			}
			if (storyFile.value instanceof File) try {
				const uploadRes = await aboutUsApiService.uploadImage(storyFile.value, token);
				if (uploadRes?.url || uploadRes?.full_url) {
					form.story_image = uploadRes.url || uploadRes.full_url;
					form.story_image_full_url = uploadRes.full_url || uploadRes.url;
					storyPreview.value = uploadRes.full_url || uploadRes.url;
				}
			} catch (uploadErr) {
				console.warn("[useAboutUs] Upload story image via dedicated endpoint failed:", uploadErr);
			}
			const fd = new FormData();
			fd.append("_method", "PUT");
			fd.append("title_ar", form.title_ar || "");
			fd.append("title_en", form.title_en || "");
			fd.append("title", form.title_ar || form.title_en || "");
			fd.append("subtitle_ar", form.subtitle_ar || "");
			fd.append("subtitle_en", form.subtitle_en || "");
			fd.append("subtitle", form.subtitle_ar || form.subtitle_en || "");
			fd.append("story_title_ar", form.story_title_ar || "");
			fd.append("story_title_en", form.story_title_en || "");
			fd.append("story_title", form.story_title_ar || form.story_title_en || "");
			fd.append("story_content_ar", form.story_content_ar || "");
			fd.append("story_content_en", form.story_content_en || "");
			fd.append("story_content", form.story_content_ar || form.story_content_en || "");
			fd.append("vision_title_ar", form.vision_title_ar || "");
			fd.append("vision_title_en", form.vision_title_en || "");
			fd.append("vision_title", form.vision_title_ar || form.vision_title_en || "");
			fd.append("vision_content_ar", form.vision_content_ar || "");
			fd.append("vision_content_en", form.vision_content_en || "");
			fd.append("vision_content", form.vision_content_ar || form.vision_content_en || "");
			fd.append("mission_title_ar", form.mission_title_ar || "");
			fd.append("mission_title_en", form.mission_title_en || "");
			fd.append("mission_title", form.mission_title_ar || form.mission_title_en || "");
			fd.append("mission_content_ar", form.mission_content_ar || "");
			fd.append("mission_content_en", form.mission_content_en || "");
			fd.append("mission_content", form.mission_content_ar || form.mission_content_en || "");
			fd.append("stats_customers", String(form.stats_customers || "25,000+"));
			fd.append("stats_customers_label_ar", form.stats_customers_label_ar || "عميل سعيد وموثوق");
			fd.append("stats_customers_label_en", form.stats_customers_label_en || "Satisfied Customers");
			fd.append("stats_customers_icon", form.stats_customers_icon || "fa-solid fa-users");
			fd.append("stats_products", String(form.stats_products || "1,500+"));
			fd.append("stats_products_label_ar", form.stats_products_label_ar || "منتج أصلي معتمد");
			fd.append("stats_products_label_en", form.stats_products_label_en || "Certified Products");
			fd.append("stats_products_icon", form.stats_products_icon || "fa-solid fa-boxes-stacked");
			fd.append("stats_experience", String(form.stats_experience || "10+"));
			fd.append("stats_experience_label_ar", form.stats_experience_label_ar || "سنوات من الخبرة");
			fd.append("stats_experience_label_en", form.stats_experience_label_en || "Years of Experience");
			fd.append("stats_experience_icon", form.stats_experience_icon || "fa-solid fa-award");
			fd.append("stats_awards", String(form.stats_awards || "100%"));
			fd.append("stats_awards_label_ar", form.stats_awards_label_ar || "ضمان وجودة معتمدة");
			fd.append("stats_awards_label_en", form.stats_awards_label_en || "Warranty & Quality");
			fd.append("stats_awards_icon", form.stats_awards_icon || "fa-solid fa-shield");
			fd.append("stats_warranty", String(form.stats_awards || "100%"));
			fd.append("stats_excellence", "99.8%");
			fd.append("stats_satisfaction", "99%");
			const statsObj = {
				customers: {
					value: form.stats_customers || "25,000+",
					label_ar: form.stats_customers_label_ar || "عميل سعيد وموثوق",
					label_en: form.stats_customers_label_en || "Satisfied Customers",
					icon: form.stats_customers_icon || "fa-solid fa-users"
				},
				products: {
					value: form.stats_products || "1,500+",
					label_ar: form.stats_products_label_ar || "منتج أصلي معتمد",
					label_en: form.stats_products_label_en || "Certified Products",
					icon: form.stats_products_icon || "fa-solid fa-boxes-stacked"
				},
				experience: {
					value: form.stats_experience || "10+",
					label_ar: form.stats_experience_label_ar || "سنوات من الخبرة",
					label_en: form.stats_experience_label_en || "Years of Experience",
					icon: form.stats_experience_icon || "fa-solid fa-award"
				},
				awards: {
					value: form.stats_awards || "100%",
					label_ar: form.stats_awards_label_ar || "ضمان وجودة معتمدة",
					label_en: form.stats_awards_label_en || "Warranty & Quality",
					icon: form.stats_awards_icon || "fa-solid fa-shield"
				}
			};
			fd.append("stats", JSON.stringify(statsObj));
			fd.append("features_badge_ar", form.features_badge_ar || "التزاماتنا لعملائنا");
			fd.append("features_badge_en", form.features_badge_en || "Store Commitments");
			fd.append("features_title_ar", form.features_title_ar || "لماذا يفضل العملاء التسوق معنا؟");
			fd.append("features_title_en", form.features_title_en || "Why Shop With Aswar Jeddah?");
			fd.append("feature_1_title_ar", form.feature_1_title_ar || "");
			fd.append("feature_1_title_en", form.feature_1_title_en || "");
			fd.append("feature_1_desc_ar", form.feature_1_desc_ar || "");
			fd.append("feature_1_desc_en", form.feature_1_desc_en || "");
			fd.append("feature_1_icon", form.feature_1_icon || "fa-solid fa-shield");
			fd.append("feature_2_title_ar", form.feature_2_title_ar || "");
			fd.append("feature_2_title_en", form.feature_2_title_en || "");
			fd.append("feature_2_desc_ar", form.feature_2_desc_ar || "");
			fd.append("feature_2_desc_en", form.feature_2_desc_en || "");
			fd.append("feature_2_icon", form.feature_2_icon || "fa-solid fa-truck-fast");
			fd.append("feature_3_title_ar", form.feature_3_title_ar || "");
			fd.append("feature_3_title_en", form.feature_3_title_en || "");
			fd.append("feature_3_desc_ar", form.feature_3_desc_ar || "");
			fd.append("feature_3_desc_en", form.feature_3_desc_en || "");
			fd.append("feature_3_icon", form.feature_3_icon || "fa-solid fa-credit-card");
			fd.append("feature_4_title_ar", form.feature_4_title_ar || "");
			fd.append("feature_4_title_en", form.feature_4_title_en || "");
			fd.append("feature_4_desc_ar", form.feature_4_desc_ar || "");
			fd.append("feature_4_desc_en", form.feature_4_desc_en || "");
			fd.append("feature_4_icon", form.feature_4_icon || "fa-solid fa-headset");
			const valuesArray = [
				{
					id: 1,
					icon: form.feature_1_icon || "fa-solid fa-shield",
					title_ar: form.feature_1_title_ar || "",
					title_en: form.feature_1_title_en || "",
					title: form.feature_1_title_ar || form.feature_1_title_en || "",
					desc_ar: form.feature_1_desc_ar || "",
					desc_en: form.feature_1_desc_en || "",
					description_ar: form.feature_1_desc_ar || "",
					description_en: form.feature_1_desc_en || ""
				},
				{
					id: 2,
					icon: form.feature_2_icon || "fa-solid fa-truck-fast",
					title_ar: form.feature_2_title_ar || "",
					title_en: form.feature_2_title_en || "",
					title: form.feature_2_title_ar || form.feature_2_title_en || "",
					desc_ar: form.feature_2_desc_ar || "",
					desc_en: form.feature_2_desc_en || "",
					description_ar: form.feature_2_desc_ar || "",
					description_en: form.feature_2_desc_en || ""
				},
				{
					id: 3,
					icon: form.feature_3_icon || "fa-solid fa-credit-card",
					title_ar: form.feature_3_title_ar || "",
					title_en: form.feature_3_title_en || "",
					title: form.feature_3_title_ar || form.feature_3_title_en || "",
					desc_ar: form.feature_3_desc_ar || "",
					desc_en: form.feature_3_desc_en || "",
					description_ar: form.feature_3_desc_ar || "",
					description_en: form.feature_3_desc_en || ""
				},
				{
					id: 4,
					icon: form.feature_4_icon || "fa-solid fa-headset",
					title_ar: form.feature_4_title_ar || "",
					title_en: form.feature_4_title_en || "",
					title: form.feature_4_title_ar || form.feature_4_title_en || "",
					desc_ar: form.feature_4_desc_ar || "",
					desc_en: form.feature_4_desc_en || "",
					description_ar: form.feature_4_desc_ar || "",
					description_en: form.feature_4_desc_en || ""
				}
			];
			fd.append("values", JSON.stringify(valuesArray));
			valuesArray.forEach((val, idx) => {
				fd.append(`values[${idx}][icon]`, val.icon);
				fd.append(`values[${idx}][title_ar]`, val.title_ar);
				fd.append(`values[${idx}][title_en]`, val.title_en);
				fd.append(`values[${idx}][desc_ar]`, val.desc_ar);
				fd.append(`values[${idx}][desc_en]`, val.desc_en);
			});
			fd.append("cta_title_ar", form.cta_title_ar || "");
			fd.append("cta_title_en", form.cta_title_en || "");
			fd.append("cta_desc_ar", form.cta_desc_ar || "");
			fd.append("cta_desc_en", form.cta_desc_en || "");
			fd.append("cta_btn_ar", form.cta_btn_ar || "");
			fd.append("cta_btn_en", form.cta_btn_en || "");
			fd.append("cta_url", form.cta_url || "/shop");
			if (form.banner_image) fd.append("banner_image", form.banner_image);
			if (form.banner_image_full_url) fd.append("banner_image_full_url", form.banner_image_full_url);
			if (form.story_image) fd.append("story_image", form.story_image);
			if (form.story_image_full_url) fd.append("story_image_full_url", form.story_image_full_url);
			if (bannerFile.value instanceof File) {
				fd.append("banner_file", bannerFile.value);
				fd.append("banner", bannerFile.value);
			}
			if (storyFile.value instanceof File) {
				fd.append("story_file", storyFile.value);
				fd.append("story", storyFile.value);
			}
			const res = await aboutUsApiService.updateAdminAboutUs(token, fd);
			if (res?.success) {
				if (res.data) {
					aboutData.value = {
						...form,
						...res.data
					};
					Object.assign(form, aboutData.value);
					const newBanner = res.data.banner_image_full_url || aboutUsApiService.resolveImageUrl(res.data.banner_image);
					if (newBanner) {
						bannerPreview.value = newBanner;
						form.banner_image_full_url = newBanner;
					}
					const newStory = res.data.story_image_full_url || aboutUsApiService.resolveImageUrl(res.data.story_image);
					if (newStory) {
						storyPreview.value = newStory;
						form.story_image_full_url = newStory;
					}
				} else aboutData.value = { ...form };
				bannerFile.value = null;
				storyFile.value = null;
				aboutData.value;
				toast.success(res.message || "تم حفظ وتحديث بيانات صفحة من نحن بنجاح!");
				return { success: true };
			} else throw new Error(res?.message || "فشل حفظ التعديلات");
		} catch (err) {
			toast.error(err.data?.message || err.message || "حدث خطأ أثناء حفظ البيانات");
			throw err;
		} finally {
			isSubmitting.value = false;
		}
	};
	const displayTitle = computed(() => {
		return currentLanguage?.value === "en" ? aboutData.value.title_en || aboutData.value.title_ar || aboutData.value.title : aboutData.value.title_ar || aboutData.value.title || aboutData.value.title_en;
	});
	const displaySubtitle = computed(() => {
		return currentLanguage?.value === "en" ? aboutData.value.subtitle_en || aboutData.value.subtitle_ar || aboutData.value.subtitle : aboutData.value.subtitle_ar || aboutData.value.subtitle || aboutData.value.subtitle_en;
	});
	const displayStoryTitle = computed(() => {
		return currentLanguage?.value === "en" ? aboutData.value.story_title_en || aboutData.value.story_title_ar || aboutData.value.story_title : aboutData.value.story_title_ar || aboutData.value.story_title || aboutData.value.story_title_en;
	});
	const displayStoryContent = computed(() => {
		return currentLanguage?.value === "en" ? aboutData.value.story_content_en || aboutData.value.story_content_ar || aboutData.value.story_content : aboutData.value.story_content_ar || aboutData.value.story_content || aboutData.value.story_content_en;
	});
	const displayVisionTitle = computed(() => {
		return currentLanguage?.value === "en" ? aboutData.value.vision_title_en || aboutData.value.vision_title_ar || aboutData.value.vision_title : aboutData.value.vision_title_ar || aboutData.value.vision_title || aboutData.value.vision_title_en;
	});
	const displayVisionContent = computed(() => {
		return currentLanguage?.value === "en" ? aboutData.value.vision_content_en || aboutData.value.vision_content_ar || aboutData.value.vision_content : aboutData.value.vision_content_ar || aboutData.value.vision_content || aboutData.value.vision_content_en;
	});
	const displayMissionTitle = computed(() => {
		return currentLanguage?.value === "en" ? aboutData.value.mission_title_en || aboutData.value.mission_title_ar || aboutData.value.mission_title : aboutData.value.mission_title_ar || aboutData.value.mission_title || aboutData.value.mission_title_en;
	});
	const displayMissionContent = computed(() => {
		return currentLanguage?.value === "en" ? aboutData.value.mission_content_en || aboutData.value.mission_content_ar || aboutData.value.mission_content : aboutData.value.mission_content_ar || aboutData.value.mission_content || aboutData.value.mission_content_en;
	});
	const displayFeaturesBadge = computed(() => {
		return currentLanguage?.value === "en" ? aboutData.value.features_badge_en || "Store Commitments" : aboutData.value.features_badge_ar || "التزاماتنا لعملائنا";
	});
	const displayFeaturesTitle = computed(() => {
		return currentLanguage?.value === "en" ? aboutData.value.features_title_en || "Why Shop With Aswar Jeddah?" : aboutData.value.features_title_ar || "لماذا يفضل العملاء التسوق معنا؟";
	});
	const displayFeature1 = computed(() => {
		const isEn = currentLanguage?.value === "en";
		return {
			title: isEn ? aboutData.value.feature_1_title_en || "100% Genuine Products" : aboutData.value.feature_1_title_ar || "منتجات أصلية 100%",
			desc: isEn ? aboutData.value.feature_1_desc_en || "Direct from certified brands and authorized distributors" : aboutData.value.feature_1_desc_ar || "نوفر كافة الأجهزة مباشرة من الوكلاء والمصادر المعتمدة",
			icon: aboutData.value.feature_1_icon || "fa-solid fa-shield"
		};
	});
	const displayFeature2 = computed(() => {
		const isEn = currentLanguage?.value === "en";
		return {
			title: isEn ? aboutData.value.feature_2_title_en || "Fast Kingdom Shipping" : aboutData.value.feature_2_title_ar || "شحن سريع وآمن",
			desc: isEn ? aboutData.value.feature_2_desc_en || "Reliable door-to-door delivery across all regions of KSA" : aboutData.value.feature_2_desc_ar || "توصيل موثوق ومحمي لكافة مدن ومناطق المملكة",
			icon: aboutData.value.feature_2_icon || "fa-solid fa-truck-fast"
		};
	});
	const displayFeature3 = computed(() => {
		const isEn = currentLanguage?.value === "en";
		return {
			title: isEn ? aboutData.value.feature_3_title_en || "Secure Payment Options" : aboutData.value.feature_3_title_ar || "طرق دفع متعددة وآمنة",
			desc: isEn ? aboutData.value.feature_3_desc_en || "Support for Mada, Apple Pay, Visa, and installments" : aboutData.value.feature_3_desc_ar || "مدى، فيزا، ماستركارد، آبل باي وخيارات التقسيط الميسر",
			icon: aboutData.value.feature_3_icon || "fa-solid fa-credit-card"
		};
	});
	const displayFeature4 = computed(() => {
		const isEn = currentLanguage?.value === "en";
		return {
			title: isEn ? aboutData.value.feature_4_title_en || "Dedicated Support" : aboutData.value.feature_4_title_ar || "خدمة عملاء متخصصة",
			desc: isEn ? aboutData.value.feature_4_desc_en || "Our technical support team is ready to assist you anytime" : aboutData.value.feature_4_desc_ar || "فريق متكامل للإجابة على استفساراتكم ومتابعة طلباتكم",
			icon: aboutData.value.feature_4_icon || "fa-solid fa-headset"
		};
	});
	const displayCta = computed(() => {
		const isEn = currentLanguage?.value === "en";
		return {
			title: isEn ? aboutData.value.cta_title_en || "Discover Thousands of Verified Products" : aboutData.value.cta_title_ar || "اكتشف آلاف الأجهزة والحلول التقنية المعتمدة",
			desc: isEn ? aboutData.value.cta_desc_en || "Shop with complete peace of mind with our official warranties." : aboutData.value.cta_desc_ar || "تسوق بأعلى مستويات الأمان والضمان المعتمد في كافة أنحاء المملكة.",
			btn: isEn ? aboutData.value.cta_btn_en || "Browse All Products" : aboutData.value.cta_btn_ar || "تسوق المنتجات الآن",
			url: aboutData.value.cta_url || "/shop"
		};
	});
	return {
		aboutData,
		form,
		isLoading,
		isSubmitting,
		bannerFile,
		bannerPreview,
		storyFile,
		storyPreview,
		fetchPublicAboutUs,
		fetchAdminAboutUs,
		submitAdminAboutUs,
		handleBannerFileChange,
		handleStoryFileChange,
		displayTitle,
		displaySubtitle,
		displayStoryTitle,
		displayStoryContent,
		displayVisionTitle,
		displayVisionContent,
		displayMissionTitle,
		displayMissionContent,
		displayStats: computed(() => {
			const isEn = currentLanguage?.value === "en";
			const d = aboutData.value;
			return [
				{
					id: 1,
					key: "customers",
					value: d.stats_customers || "25,000+",
					label: isEn ? d.stats_customers_label_en || "Satisfied Customers" : d.stats_customers_label_ar || "عميل سعيد وموثوق",
					icon: d.stats_customers_icon || "fa-solid fa-users",
					colorClass: "bg-amber-50 border-amber-100 text-amber-500"
				},
				{
					id: 2,
					key: "products",
					value: d.stats_products || "1,500+",
					label: isEn ? d.stats_products_label_en || "Certified Products" : d.stats_products_label_ar || "منتج أصلي معتمد",
					icon: d.stats_products_icon || "fa-solid fa-boxes-stacked",
					colorClass: "bg-indigo-50 border-indigo-100 text-indigo-600"
				},
				{
					id: 3,
					key: "experience",
					value: d.stats_experience || "10+",
					label: isEn ? d.stats_experience_label_en || "Years of Experience" : d.stats_experience_label_ar || "سنوات من الخبرة",
					icon: d.stats_experience_icon || "fa-solid fa-award",
					colorClass: "bg-purple-50 border-purple-100 text-purple-600"
				},
				{
					id: 4,
					key: "awards",
					value: d.stats_awards || d.stats_warranty || "100%",
					label: isEn ? d.stats_awards_label_en || "Warranty & Quality" : d.stats_awards_label_ar || "ضمان وجودة معتمدة",
					icon: d.stats_awards_icon || "fa-solid fa-shield",
					colorClass: "bg-emerald-50 border-emerald-100 text-emerald-600"
				}
			];
		}),
		displayFeaturesBadge,
		displayFeaturesTitle,
		displayFeature1,
		displayFeature2,
		displayFeature3,
		displayFeature4,
		displayCta
	};
};

export { useAboutUs as u };
//# sourceMappingURL=useAboutUs-CRQHzHzE.mjs.map
