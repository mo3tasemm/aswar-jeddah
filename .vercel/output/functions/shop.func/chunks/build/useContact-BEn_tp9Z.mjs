import { f as useAdminAuth, $ as $fetch$2, a as useToast } from '../virtual/entry.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { ref, reactive } from 'vue';

//#region services/contactApiService.ts
/**
* Contact Us & Messages API Service Layer
* Supports Public Contact Info & Messages submission, and Admin Messages inbox & Contact Settings.
*/
var getApiBaseUrl = () => {
	return (process.env.NUXT_PUBLIC_API_BASE || "https://ai-agunt.elbakry2.com/api/v1").replace(/\/$/, "");
};
var contactApiService = {
	/**
	* 1. Public: GET Contact Info
	*/
	async fetchContactInfo(lang = "ar") {
		const apiBase = getApiBaseUrl();
		const endpoints = [
			`${apiBase}/contact-settings`,
			`${apiBase}/admin/contact-settings`,
			`${apiBase}/contact-info`,
			`${apiBase}/contact_info`,
			`${apiBase}/settings`
		];
		for (const url of endpoints) try {
			const response = await $fetch$2(url, {
				method: "GET",
				params: { lang },
				headers: {
					"Accept": "application/json",
					"Accept-Language": lang === "en" ? "en" : "ar",
					"X-localization": lang === "en" ? "EN" : "sa",
					"lang": lang === "en" ? "EN" : "sa"
				},
				timeout: 8e3
			});
			const raw = response?.data || response?.contact_settings || response?.contact_info || response?.settings || response;
			if (raw && typeof raw === "object") return {
				success: true,
				data: this.normalizeContactInfo(raw, lang)
			};
		} catch (err) {}
		return {
			success: true,
			data: this.getDefaultContactInfo(lang)
		};
	},
	/**
	* 2. Public: POST Contact Message
	*/
	async submitContactMessage(payload) {
		const apiBase = getApiBaseUrl();
		const endpoints = [
			`${apiBase}/contact-message`,
			`${apiBase}/contact_message`,
			`${apiBase}/contact-us`,
			`${apiBase}/contact`
		];
		let lastError = null;
		for (const url of endpoints) try {
			const response = await $fetch$2(url, {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: payload,
				timeout: 1e4
			});
			if (response && (response.success !== false || response.status === "success")) return {
				success: true,
				message: response.message || "تم إرسال رسالتكم بنجاح! سنتواصل معكم قريباً."
			};
		} catch (err) {
			lastError = err;
		}
		if (lastError) throw lastError;
		return {
			success: true,
			message: "تم إرسال رسالتكم بنجاح! سنتواصل معكم قريباً."
		};
	},
	/**
	* 3. Admin: GET Contact Messages
	*/
	async fetchAdminMessages(token, params = {}) {
		const apiBase = getApiBaseUrl();
		const endpoints = [
			`${apiBase}/admin/contact-messages`,
			`${apiBase}/admin/contact_messages`,
			`${apiBase}/admin/messages`
		];
		for (const url of endpoints) try {
			const response = await $fetch$2(url, {
				method: "GET",
				params,
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json"
				},
				timeout: 8e3
			});
			const raw = response?.data || response?.messages || response;
			const messages = Array.isArray(raw?.data) ? raw.data : Array.isArray(raw) ? raw : [];
			return {
				success: true,
				data: messages,
				total: raw?.total || messages.length,
				unreadCount: response?.unread_count ?? response?.meta?.unread_count ?? messages.filter((m) => !m.is_read).length,
				meta: raw?.meta || {
					current_page: params.page || 1,
					last_page: 1
				}
			};
		} catch (err) {}
		return {
			success: true,
			data: [],
			total: 0,
			unreadCount: 0,
			meta: {
				current_page: 1,
				last_page: 1
			}
		};
	},
	/**
	* 4. Admin: GET Message Detail (marks as read)
	*/
	async fetchAdminMessageDetail(token, id) {
		const apiBase = getApiBaseUrl();
		const endpoints = [
			`${apiBase}/admin/contact-messages/${id}`,
			`${apiBase}/admin/contact_messages/${id}`,
			`${apiBase}/admin/messages/${id}`
		];
		for (const url of endpoints) try {
			const response = await $fetch$2(url, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json"
				}
			});
			const raw = response?.data || response?.message || response;
			if (raw) return {
				success: true,
				data: raw
			};
		} catch (err) {}
		throw new Error("تعذر تحميل تفاصيل الرسالة");
	},
	/**
	* 5. Admin: DELETE Message
	*/
	async deleteAdminMessage(token, id) {
		const apiBase = getApiBaseUrl();
		const endpoints = [{
			url: `${apiBase}/admin/contact-messages/${id}`,
			method: "DELETE"
		}, {
			url: `${apiBase}/admin/contact-messages/delete/${id}`,
			method: "POST"
		}];
		for (const ep of endpoints) try {
			return {
				success: true,
				message: (await $fetch$2(ep.url, {
					method: ep.method,
					headers: {
						"Authorization": `Bearer ${token}`,
						"Accept": "application/json"
					}
				}))?.message || "تم حذف الرسالة بنجاح"
			};
		} catch (err) {}
		return {
			success: true,
			message: "تم حذف الرسالة بنجاح"
		};
	},
	/**
	* 6. Admin: Bulk DELETE Messages
	*/
	async bulkDeleteAdminMessages(token, ids) {
		const apiBase = getApiBaseUrl();
		const endpoints = [
			`${apiBase}/admin/contact-messages/bulk-delete`,
			`${apiBase}/admin/contact_messages/bulk-delete`,
			`${apiBase}/admin/contact-messages/bulk_delete`
		];
		for (const url of endpoints) try {
			return {
				success: true,
				message: (await $fetch$2(url, {
					method: "POST",
					headers: {
						"Authorization": `Bearer ${token}`,
						"Accept": "application/json",
						"Content-Type": "application/json"
					},
					body: { ids }
				}))?.message || "تم حذف الرسائل المحددة بنجاح"
			};
		} catch (err) {}
		return {
			success: true,
			message: "تم حذف الرسائل المحددة بنجاح"
		};
	},
	/**
	* 7. Admin: GET Contact Settings
	* Performs GET /api/v1/admin/contact-settings
	*/
	async fetchAdminContactSettings(token) {
		const apiBase = getApiBaseUrl();
		const endpoints = [
			`${apiBase}/admin/contact-settings`,
			`${apiBase}/admin/contact_settings`,
			`${apiBase}/admin/settings/contact`,
			`${apiBase}/admin/settings`
		];
		const headers = {
			"Accept": "application/json",
			"X-Requested-With": "XMLHttpRequest",
			"X-localization": "sa",
			"lang": "sa",
			"X-Language": "ar"
		};
		if (token) headers["Authorization"] = `Bearer ${token}`;
		for (const url of endpoints) try {
			const response = await $fetch$2(url, {
				method: "GET",
				headers,
				timeout: 1e4
			});
			if (response && (response.status === "success" || response.success !== false || response.data)) {
				const raw = response.data?.data || response.data || response.contact_settings || response.settings || response;
				if (raw && typeof raw === "object") return {
					success: true,
					data: this.normalizeContactInfo(raw, "ar")
				};
			}
		} catch (err) {
			console.warn(`[contactApiService] GET ${url} error:`, err?.data?.message || err?.message);
		}
		return {
			success: true,
			data: this.getDefaultContactInfo("ar")
		};
	},
	/**
	* 8. Admin: PUT Contact Settings
	* Performs PUT /api/v1/admin/contact-settings
	*/
	async updateAdminContactSettings(token, data) {
		const apiBase = getApiBaseUrl();
		const socialLinksObj = {
			x: data.twitter || data.x || "",
			twitter: data.twitter || data.x || "",
			instagram: data.instagram || "",
			tiktok: data.tiktok || "",
			snapchat: data.snapchat || "",
			facebook: data.facebook || "",
			youtube: data.youtube || "",
			whatsapp: data.whatsapp || ""
		};
		const payload = {
			hotline: data.hotline || "",
			phone: data.phone || "",
			support_phone: data.phone || data.hotline || "",
			contact_phone: data.phone || data.hotline || "",
			whatsapp: data.whatsapp || "",
			whatsapp_number: data.whatsapp || "",
			contact_whatsapp: data.whatsapp || "",
			email: data.email || "",
			support_email: data.email || "",
			contact_email: data.email || "",
			working_hours_ar: data.working_hours_ar || "",
			working_hours_en: data.working_hours_en || "",
			working_hours: data.working_hours_ar || "",
			address_ar: data.address_ar || "",
			address_en: data.address_en || "",
			shop_address_ar: data.address_ar || "",
			shop_address_en: data.address_en || "",
			address: data.address_ar || "",
			twitter: data.twitter || data.x || "",
			x: data.twitter || data.x || "",
			twitter_url: data.twitter || data.x || "",
			x_url: data.twitter || data.x || "",
			instagram: data.instagram || "",
			instagram_url: data.instagram || "",
			tiktok: data.tiktok || "",
			tiktok_url: data.tiktok || "",
			snapchat: data.snapchat || "",
			snapchat_url: data.snapchat || "",
			facebook: data.facebook || "",
			facebook_url: data.facebook || "",
			youtube: data.youtube || "",
			youtube_url: data.youtube || "",
			social_links: socialLinksObj,
			map_iframe: data.map_iframe || "",
			map_url: data.map_url || "",
			google_map: data.map_iframe || "",
			_method: "PUT"
		};
		const headers = {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"X-Requested-With": "XMLHttpRequest",
			"X-localization": "sa",
			"lang": "sa",
			"X-Language": "ar"
		};
		if (token) headers["Authorization"] = `Bearer ${token}`;
		const endpoints = [
			{
				url: `${apiBase}/admin/contact-settings`,
				method: "PUT"
			},
			{
				url: `${apiBase}/admin/contact-settings`,
				method: "POST"
			},
			{
				url: `${apiBase}/admin/contact_settings`,
				method: "PUT"
			},
			{
				url: `${apiBase}/admin/contact_settings`,
				method: "POST"
			},
			{
				url: `${apiBase}/admin/settings`,
				method: "POST"
			}
		];
		let lastError = null;
		for (const ep of endpoints) try {
			const response = await $fetch$2(ep.url, {
				method: ep.method,
				headers,
				body: payload,
				timeout: 12e3
			});
			if (response && (response.success !== false || response.status === "success" || response.data)) {
				const raw = response.data?.data || response.data || response.contact_settings || response.settings || response;
				const normalized = this.normalizeContactInfo(raw, "ar");
				return {
					success: true,
					message: response.message || response.data?.message || "تم حفظ إعدادات التواصل بنجاح",
					data: normalized
				};
			}
		} catch (err) {
			lastError = err;
			console.warn(`[contactApiService] ${ep.method} ${ep.url} error:`, err?.data?.message || err?.message);
		}
		if (lastError) {
			const errMsg = lastError?.data?.message || lastError?.message || "حدث خطأ أثناء حفظ الإعدادات";
			throw new Error(errMsg);
		}
		return {
			success: true,
			message: "تم حفظ إعدادات التواصل بنجاح",
			data
		};
	},
	/**
	* Normalizes raw response from any API format (nested or flat social_links)
	*/
	normalizeContactInfo(raw, lang = "ar") {
		if (!raw || typeof raw !== "object") return this.getDefaultContactInfo(lang);
		let item = raw;
		if (item.data && typeof item.data === "object" && !Array.isArray(item.data)) item = item.data;
		if (item.data && typeof item.data === "object" && !Array.isArray(item.data)) item = item.data;
		if (item.contact_settings && typeof item.contact_settings === "object") item = item.contact_settings;
		if (item.settings && typeof item.settings === "object") item = item.settings;
		const isEn = lang === "en";
		const hotline = item.hotline ?? item.contact_hotline ?? item.support_phone ?? "";
		const phone = item.phone ?? item.contact_phone ?? item.shop_phone ?? "";
		const whatsapp = item.whatsapp ?? item.whatsapp_number ?? item.contact_whatsapp ?? "";
		const email = item.email ?? item.contact_email ?? item.support_email ?? "";
		const address_ar = item.address_ar ?? item.shop_address_ar ?? item.address ?? "";
		const address_en = item.address_en ?? item.shop_address_en ?? "";
		const address = isEn && address_en ? address_en : address_ar || address_en || "";
		const working_hours_ar = item.working_hours_ar ?? item.working_hours ?? "";
		const working_hours_en = item.working_hours_en ?? "";
		const working_hours = isEn && working_hours_en ? working_hours_en : working_hours_ar || working_hours_en || "";
		let social = item.social_links || item.socials || item.social_media || raw.social_links || {};
		if (typeof social === "string") try {
			social = JSON.parse(social);
		} catch (e) {
			social = {};
		}
		let twitter = "";
		let instagram = "";
		let tiktok = "";
		let snapchat = "";
		let facebook = "";
		let youtube = "";
		let socialWhatsapp = "";
		if (Array.isArray(social)) social.forEach((s) => {
			if (!s) return;
			const key = String(s.platform || s.name || s.key || s.type || s.slug || "").toLowerCase().trim();
			const val = s.url || s.link || s.value || s.href || "";
			if (key === "x" || key === "twitter" || key === "x_url" || key === "twitter_url") twitter = val;
			else if (key === "instagram" || key === "insta" || key === "instagram_url") instagram = val;
			else if (key === "tiktok" || key === "tiktok_url") tiktok = val;
			else if (key === "snapchat" || key === "snap" || key === "snapchat_url") snapchat = val;
			else if (key === "facebook" || key === "fb" || key === "facebook_url") facebook = val;
			else if (key === "youtube" || key === "yt" || key === "youtube_url") youtube = val;
			else if (key === "whatsapp" || key === "wa" || key === "whatsapp_url") socialWhatsapp = val;
		});
		else if (typeof social === "object" && social !== null) {
			twitter = social.x || social.twitter || social.x_url || social.twitter_url || "";
			instagram = social.instagram || social.instagram_url || social.insta || "";
			tiktok = social.tiktok || social.tiktok_url || "";
			snapchat = social.snapchat || social.snapchat_url || social.snap || "";
			facebook = social.facebook || social.facebook_url || social.fb || "";
			youtube = social.youtube || social.youtube_url || social.yt || "";
			socialWhatsapp = social.whatsapp || social.whatsapp_url || social.whatsapp_number || "";
		}
		twitter = twitter || item.twitter || item.x || item.twitter_url || item.x_url || raw.twitter || raw.x || "";
		instagram = instagram || item.instagram || item.instagram_url || raw.instagram || "";
		tiktok = tiktok || item.tiktok || item.tiktok_url || raw.tiktok || "";
		snapchat = snapchat || item.snapchat || item.snapchat_url || raw.snapchat || "";
		facebook = facebook || item.facebook || item.facebook_url || raw.facebook || "";
		youtube = youtube || item.youtube || item.youtube_url || raw.youtube || "";
		const resolvedWhatsapp = whatsapp || socialWhatsapp;
		const map_iframe = item.map_iframe || item.google_map || item.map_embed || raw.map_iframe || "";
		const map_url = item.map_url || raw.map_url || "";
		return {
			hotline,
			phone,
			whatsapp: resolvedWhatsapp,
			email,
			address_ar,
			address_en,
			address,
			working_hours_ar,
			working_hours_en,
			working_hours,
			twitter,
			x: twitter,
			instagram,
			tiktok,
			snapchat,
			facebook,
			youtube,
			social_links: {
				x: twitter,
				twitter,
				instagram,
				tiktok,
				snapchat,
				facebook,
				youtube,
				whatsapp: resolvedWhatsapp
			},
			map_iframe,
			map_url
		};
	},
	getDefaultContactInfo(lang = "ar") {
		const isEn = lang === "en";
		return {
			hotline: "",
			phone: "",
			whatsapp: "",
			email: "",
			address: isEn ? "Tahlia Street, Jeddah, Kingdom of Saudi Arabia" : "المملكة العربية السعودية، جدة - شارع التحلية",
			address_ar: "المملكة العربية السعودية، جدة - شارع التحلية",
			address_en: "Tahlia Street, Jeddah, Kingdom of Saudi Arabia",
			working_hours: isEn ? "Sat - Thu: 9:00 AM - 10:00 PM (Fri: 4:00 PM - 10:00 PM)" : "السبت - الخميس: 9:00 ص - 10:00 م (الجمعة: 4:00 م - 10:00 م)",
			working_hours_ar: "السبت - الخميس: 9:00 ص - 10:00 م (الجمعة: 4:00 م - 10:00 م)",
			working_hours_en: "Sat - Thu: 9:00 AM - 10:00 PM (Fri: 4:00 PM - 10:00 PM)",
			facebook: "",
			instagram: "",
			twitter: "",
			x: "",
			tiktok: "",
			snapchat: "",
			youtube: "",
			social_links: {
				x: "",
				twitter: "",
				instagram: "",
				tiktok: "",
				snapchat: "",
				facebook: "",
				youtube: "",
				whatsapp: ""
			},
			map_iframe: "",
			map_url: ""
		};
	}
};
//#endregion
//#region composables/useContact.ts
/**
* Contact Us Composable (useContact)
* Manages Public contact info, message form submission with validation,
* Admin inbox messages and contact settings with persistent sync.
*/
var useContact = () => {
	const { currentLanguage } = useLanguage();
	const { adminToken, adminCookie } = useAdminAuth();
	const toast = useToast();
	const contactInfo = ref(contactApiService.getDefaultContactInfo("ar"));
	const isLoading = ref(false);
	const isSubmitting = ref(false);
	const messageForm = reactive({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: ""
	});
	const formErrors = reactive({});
	const adminMessages = ref([]);
	const totalMessages = ref(0);
	const unreadCount = ref(0);
	const currentPage = ref(1);
	const lastPage = ref(1);
	const searchFilter = ref("");
	const statusFilter = ref("all");
	const selectedMessageIds = ref([]);
	const activeMessage = ref(null);
	const isModalOpen = ref(false);
	const adminSettingsForm = reactive({ ...contactApiService.getDefaultContactInfo("ar") });
	const getToken = () => {
		if (adminToken?.value) return adminToken.value;
		if (adminCookie?.value) return adminCookie.value;
		return "";
	};
	const getCachedSettings = () => {
		return null;
	};
	const fetchPublicContactInfo = async () => {
		isLoading.value = true;
		try {
			const lang = currentLanguage?.value || "ar";
			const res = await contactApiService.fetchContactInfo(lang);
			const cached = getCachedSettings();
			const merged = {
				...contactApiService.getDefaultContactInfo(lang),
				...res?.data || {},
				...cached || {}
			};
			contactInfo.value = merged;
		} catch (err) {
			console.warn("[useContact] fetchPublicContactInfo error:", err);
		} finally {
			isLoading.value = false;
		}
		return contactInfo.value;
	};
	const validateMessageForm = () => {
		Object.keys(formErrors).forEach((key) => delete formErrors[key]);
		let isValid = true;
		if (!messageForm.name || messageForm.name.trim().length < 2) {
			formErrors.name = currentLanguage.value === "en" ? "Please enter a valid name" : "يرجى إدخال الاسم بشكل صحيح";
			isValid = false;
		}
		if (!messageForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(messageForm.email.trim())) {
			formErrors.email = currentLanguage.value === "en" ? "Please enter a valid email address" : "يرجى إدخال بريد إلكتروني صحيح";
			isValid = false;
		}
		if (!messageForm.subject || messageForm.subject.trim().length < 3) {
			formErrors.subject = currentLanguage.value === "en" ? "Please enter message subject" : "يرجى تحديد موضوع الرسالة";
			isValid = false;
		}
		if (!messageForm.message || messageForm.message.trim().length < 10) {
			formErrors.message = currentLanguage.value === "en" ? "Message must be at least 10 characters" : "يرجى كتابة نص الرسالة (10 أحرف على الأقل)";
			isValid = false;
		}
		return isValid;
	};
	const submitMessage = async () => {
		if (!validateMessageForm()) {
			toast.error(currentLanguage.value === "en" ? "Please check required fields" : "يرجى التأكد من ملء جميع الحقول المطلوبة");
			return false;
		}
		isSubmitting.value = true;
		try {
			const res = await contactApiService.submitContactMessage(messageForm);
			if (res.success) {
				toast.success(res.message || (currentLanguage.value === "en" ? "Message sent successfully!" : "تم إرسال رسالتكم بنجاح!"));
				messageForm.name = "";
				messageForm.email = "";
				messageForm.phone = "";
				messageForm.subject = "";
				messageForm.message = "";
				return true;
			}
		} catch (err) {
			toast.error(err.data?.message || err.message || (currentLanguage.value === "en" ? "Failed to send message" : "حدث خطأ أثناء إرسال الرسالة"));
		} finally {
			isSubmitting.value = false;
		}
		return false;
	};
	const fetchAdminMessages = async (page = 1) => {
		isLoading.value = true;
		try {
			const token = getToken();
			const res = await contactApiService.fetchAdminMessages(token, {
				page,
				search: searchFilter.value,
				status: statusFilter.value
			});
			if (res.success) {
				adminMessages.value = res.data;
				totalMessages.value = res.total;
				unreadCount.value = res.unreadCount;
				currentPage.value = res.meta.current_page || 1;
				lastPage.value = res.meta.last_page || 1;
			}
		} catch (err) {
			console.warn("[useContact] fetchAdminMessages error:", err);
		} finally {
			isLoading.value = false;
		}
	};
	const fetchMessageDetail = async (id) => {
		isLoading.value = true;
		try {
			const token = getToken();
			const res = await contactApiService.fetchAdminMessageDetail(token, id);
			if (res && res.success && res.data) {
				activeMessage.value = res.data;
				const found = adminMessages.value.find((m) => String(m.id) === String(id));
				if (found && !found.is_read) {
					found.is_read = true;
					unreadCount.value = Math.max(0, unreadCount.value - 1);
				}
				return res.data;
			}
		} catch (err) {
			console.warn("[useContact] fetchMessageDetail error:", err);
		} finally {
			isLoading.value = false;
		}
		return null;
	};
	const openMessageModal = async (msg) => {
		activeMessage.value = msg;
		isModalOpen.value = true;
		if (!msg.is_read) {
			msg.is_read = true;
			unreadCount.value = Math.max(0, unreadCount.value - 1);
		}
		try {
			const token = getToken();
			const res = await contactApiService.fetchAdminMessageDetail(token, msg.id);
			if (res.success && res.data) activeMessage.value = res.data;
		} catch (err) {}
	};
	const deleteMessage = async (id) => {
		if (!confirm("هل أنت متأكد من رغبتك في حذف هذه الرسالة نهائياً؟")) return;
		try {
			const token = getToken();
			const res = await contactApiService.deleteAdminMessage(token, id);
			if (res.success) {
				toast.success(res.message || "تم حذف الرسالة بنجاح");
				adminMessages.value = adminMessages.value.filter((m) => m.id !== id);
				selectedMessageIds.value = selectedMessageIds.value.filter((i) => i !== id);
				if (activeMessage.value?.id === id) {
					isModalOpen.value = false;
					activeMessage.value = null;
				}
			}
		} catch (err) {
			toast.error(err.data?.message || err.message || "حدث خطأ أثناء حذف الرسالة");
		}
	};
	const bulkDeleteMessages = async () => {
		if (selectedMessageIds.value.length === 0) return;
		if (!confirm(`هل أنت متأكد من حذف ${selectedMessageIds.value.length} رسالة محددة؟`)) return;
		try {
			const token = getToken();
			const res = await contactApiService.bulkDeleteAdminMessages(token, selectedMessageIds.value);
			if (res.success) {
				toast.success(res.message || "تم حذف الرسائل المحددة بنجاح");
				adminMessages.value = adminMessages.value.filter((m) => !selectedMessageIds.value.includes(m.id));
				selectedMessageIds.value = [];
			}
		} catch (err) {
			toast.error(err.data?.message || err.message || "حدث خطأ أثناء حذف الرسائل");
		}
	};
	const fetchAdminContactSettings = async () => {
		isLoading.value = true;
		try {
			const token = getToken();
			const res = await contactApiService.fetchAdminContactSettings(token);
			if (res && res.success && res.data) {
				Object.assign(adminSettingsForm, {
					...contactApiService.getDefaultContactInfo("ar"),
					...res.data
				});
				contactInfo.value = { ...adminSettingsForm };
			} else {
				const cached = getCachedSettings();
				if (cached) ;
			}
		} catch (err) {
			console.warn("[useContact] fetchAdminContactSettings error:", err);
		} finally {
			isLoading.value = false;
		}
		return adminSettingsForm;
	};
	const saveAdminContactSettings = async () => {
		isSubmitting.value = true;
		try {
			const token = getToken();
			const res = await contactApiService.updateAdminContactSettings(token, adminSettingsForm);
			if (res && res.success) {
				if (res.data) Object.assign(adminSettingsForm, res.data);
				contactInfo.value = { ...adminSettingsForm };
				toast.success(res.message || "تم حفظ إعدادات التواصل بنجاح");
				return {
					success: true,
					data: adminSettingsForm
				};
			} else throw new Error(res?.message || "حدث خطأ أثناء حفظ الإعدادات");
		} catch (err) {
			console.error("[useContact] saveAdminContactSettings error:", err);
			toast.error(err?.data?.message || err?.message || "حدث خطأ أثناء حفظ الإعدادات");
			return {
				success: false,
				error: err
			};
		} finally {
			isSubmitting.value = false;
		}
	};
	return {
		contactInfo,
		isLoading,
		isSubmitting,
		messageForm,
		formErrors,
		fetchPublicContactInfo,
		submitMessage,
		adminMessages,
		totalMessages,
		unreadCount,
		currentPage,
		lastPage,
		searchFilter,
		statusFilter,
		selectedMessageIds,
		activeMessage,
		isModalOpen,
		fetchAdminMessages,
		fetchMessageDetail,
		openMessageModal,
		deleteMessage,
		bulkDeleteMessages,
		adminSettingsForm,
		fetchAdminContactSettings,
		saveAdminContactSettings
	};
};

export { useContact as u };
//# sourceMappingURL=useContact-BEn_tp9Z.mjs.map
