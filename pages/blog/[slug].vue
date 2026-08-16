<template>
  <div class="min-h-screen bg-slate-50/50 pb-20 selection:bg-amber-500 selection:text-white" :dir="layoutDirection">
    <div class="container mx-auto px-4 max-w-4xl py-6 sm:py-8">
      
      <!-- 1. Breadcrumbs -->
      <Breadcrumbs :items="[
        { label: layoutDirection === 'ltr' ? 'Home' : 'الرئيسية', to: '/' },
        { label: t('cat.blog'), to: '/blog' },
        { label: currentArticle ? currentArticle.title[currentLanguage] : '' }
      ]" />

      <template v-if="currentArticle">
        <!-- Article Header -->
        <header class="mt-6 mb-8 space-y-4 text-start">
          <div class="flex items-center gap-3">
            <span class="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full">
              {{ currentArticle.categoryName[currentLanguage] }}
            </span>
            <span class="text-xs text-slate-400 font-bold flex items-center gap-1">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              {{ currentArticle.readTime }} {{ t('blog.read_time') }}
            </span>
            <span class="text-xs text-slate-400 font-bold">•</span>
            <span class="text-xs text-slate-400 font-bold">{{ currentArticle.date }}</span>
          </div>

          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B0E28] leading-tight">
            {{ currentArticle.title[currentLanguage] }}
          </h1>

          <div class="flex items-center justify-between py-4 border-y border-slate-200/80">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#0B0E28] text-amber-400 font-black text-sm flex items-center justify-center border border-slate-200">
                {{ currentArticle.author.name.charAt(0) }}
              </div>
              <div>
                <p class="text-xs font-bold text-slate-900">{{ currentArticle.author.name }}</p>
                <p class="text-[11px] text-slate-500">{{ currentArticle.author.role }}</p>
              </div>
            </div>

            <!-- Share Buttons -->
            <div class="flex items-center gap-2">
              <button 
                @click="copyArticleLink" 
                class="p-2.5 rounded-xl bg-white hover:bg-amber-50 hover:text-amber-600 border border-slate-200 text-slate-600 text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                :title="t('blog.share')"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                <span class="hidden sm:inline">{{ t('blog.share') }}</span>
              </button>
            </div>
          </div>
        </header>

        <!-- Article Banner Visual -->
        <div class="w-full aspect-21/9 bg-gradient-to-br from-[#0B0E28] to-slate-800 rounded-3xl mb-8 flex items-center justify-center text-6xl shadow-md border border-slate-700/50">
          <span>{{ currentArticle.icon }}</span>
        </div>

        <!-- Article Content Body -->
        <main class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-6 text-start text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
          <div class="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-sm font-semibold">
            💡 {{ currentArticle.excerpt[currentLanguage] }}
          </div>

          <div class="space-y-4" v-html="currentArticle.content[currentLanguage]"></div>
        </main>

        <!-- Back to Blog Button & Next Articles -->
        <div class="mt-10 flex items-center justify-between">
          <NuxtLink 
            to="/blog" 
            class="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-black transition-all shadow-xs cursor-pointer"
          >
            <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            <span>{{ t('blog.back') }}</span>
          </NuxtLink>
        </div>
      </template>

      <!-- 404 Not Found for Article -->
      <div v-else class="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto my-12 space-y-4 shadow-xs">
        <div class="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto text-2xl border border-rose-200">
          ⚠️
        </div>
        <h2 class="text-lg font-black text-slate-900">المقال غير موجود</h2>
        <p class="text-xs text-slate-500">قد يكون الرابط غير صحيح أو تم نقل المقال.</p>
        <NuxtLink 
          to="/blog" 
          class="inline-block px-5 py-2.5 bg-[#0B0E28] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
        >
          {{ t('blog.back') }}
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLanguage } from '~/composables/useLanguage'
import { useToast } from '~/composables/useToast'
import Breadcrumbs from '~/components/Breadcrumbs.vue'

const route = useRoute()
const { t, currentLanguage, layoutDirection } = useLanguage()
const toast = useToast()

const articles = [
  {
    slug: 'smart-home-appliances-2026-guide',
    icon: '⚡',
    categoryName: { ar: 'الأجهزة المنزلية', en: 'Home Appliances' },
    title: {
      ar: 'دليل اختيار الأجهزة الكهربائية الموفرة للطاقة لمنزلك في 2026',
      en: 'Energy-Saving Home Appliances Buying Guide 2026'
    },
    excerpt: {
      ar: 'تعرف على أهم المعايير لاختيار أجهزة كهربائية موفرة للطاقة مع أعلى كفاءة وأطول عمر افتراضي مع توفير ملحوظ في فاتورة الكهرباء.',
      en: 'Learn the essential criteria for choosing energy-efficient home appliances with maximum longevity and significant electricity savings.'
    },
    content: {
      ar: `
        <h3 class="text-xl font-bold text-slate-900 pt-2">1. بطاقة كفاءة الطاقة (SASO)</h3>
        <p>تعتبر بطاقة كفاءة الطاقة المعتمدة في المملكة دليلك الأول؛ فكلما ارتفع المستوى زادت نسبة توفير الكهرباء على المدى الطويل وخفضت من الانبعاثات الحرارية.</p>
        <h3 class="text-xl font-bold text-slate-900 pt-2">2. تقنية المحركات الذكية Inverter</h3>
        <p>تتميز أجهزة التكييف والغسالات والثلاجات الحديثة المزودة بمحركات إنفرتر بتعديل سرعتها تلقائياً حسب الحاجة، مما يوفر ما يصل إلى 40% من الطاقة مقارنة بالمحركات التقليدية.</p>
        <h3 class="text-xl font-bold text-slate-900 pt-2">3. الضمان وتوفر قطع الغيار</h3>
        <p>احرص دائماً على الشراء من متاجر وموزعين معتمدين مثل أسوار جدة لضمان الحصول على ضمان أصلي ومراكز صيانة معتمدة.</p>
      `,
      en: `
        <h3 class="text-xl font-bold text-slate-900 pt-2">1. Energy Efficiency Labels (SASO)</h3>
        <p>Energy labels in KSA are your primary reference; higher ratings ensure long-term electricity savings and reduced heat emission.</p>
        <h3 class="text-xl font-bold text-slate-900 pt-2">2. Smart Inverter Motors</h3>
        <p>Modern ACs, washers, and refrigerators featuring inverter motors adjust speeds dynamically, reducing electricity consumption up to 40%.</p>
        <h3 class="text-xl font-bold text-slate-900 pt-2">3. Warranty & Genuine Spare Parts</h3>
        <p>Always purchase from certified distributors like Aswar Jeddah to ensure authentic warranties and authorized maintenance.</p>
      `
    },
    readTime: 5,
    date: '2026-02-10',
    author: { name: 'فريق خبراء أسوار جدة', role: 'قسم التقنية والأجهزة المنزلية' }
  },
  {
    slug: 'cctv-security-systems-tips',
    icon: '📹',
    categoryName: { ar: 'النظم الأمنية', en: 'Security Systems' },
    title: {
      ar: 'كيف تختار نظام الكاميرات والمراقبة الأنسب لمنزلك أو مكتبك؟',
      en: 'How to Choose the Best Security & CCTV System for Your Home or Office'
    },
    excerpt: {
      ar: 'مقارنة شاملة بين كاميرات IP والكاميرات اللاسلكية الذكية وأفضل ممارسات الحماية الأمنية للفلل والمكاتب التجارية.',
      en: 'A comprehensive comparison between IP and smart wireless cameras, plus top security best practices for homes and offices.'
    },
    content: {
      ar: `
        <h3 class="text-xl font-bold text-slate-900 pt-2">1. دقة التصوير والرؤية الليلية</h3>
        <p>احرص على ألا تقل دقة الكاميرات عن 4K أو 5MP مع تقنية ColorVu أو الأشعة تحت الحمراء المتطورة لضمان وضوح المعالم ليلاً.</p>
        <h3 class="text-xl font-bold text-slate-900 pt-2">2. التخزين السحابي والتخزين المحلي NVR</h3>
        <p>يوفر جهاز تسجيل NVR المتصل بالشبكة تخزيناً آمناً مع إمكانية الربط بالهاتف الذكي للمراقبة اللحظية من أي مكان في العالم.</p>
      `,
      en: `
        <h3 class="text-xl font-bold text-slate-900 pt-2">1. Video Resolution & Night Vision</h3>
        <p>Ensure cameras offer at least 5MP or 4K with ColorVu / smart IR technology for vivid nocturnal monitoring.</p>
        <h3 class="text-xl font-bold text-slate-900 pt-2">2. Local NVR & Cloud Storage</h3>
        <p>A dedicated NVR provides continuous secure recording combined with live mobile access anywhere worldwide.</p>
      `
    },
    readTime: 6,
    date: '2026-02-05',
    author: { name: 'م. أحمد العتيبي', role: 'مستشار الحلول الأمنية' }
  },
  {
    slug: 'pos-systems-retail-guide',
    icon: '💳',
    categoryName: { ar: 'أنظمة الكاشير', en: 'POS Systems' },
    title: {
      ar: 'أفضل أنظمة نقاط البيع والكاشير لإدارة متجرك بكفاءة وسهولة',
      en: 'Top POS & Cashier Systems for Seamless Retail Management'
    },
    excerpt: {
      ar: 'اكتشف كيف تختار نظام الكاشير وأجهزة الباركود الملائمة للفوترة الإلكترونية وتتبع المخزون بدقة عالية.',
      en: 'Discover how to choose the right POS hardware and barcode devices for e-invoicing and accurate inventory tracking.'
    },
    content: {
      ar: `
        <h3 class="text-xl font-bold text-slate-900 pt-2">1. التوافق مع الفوترة الإلكترونية (ZATCA)</h3>
        <p>يجب أن يدعم نظام الكاشير وطابعات الإيصالات الحرارية إنشاء رموز الاستجابة السريعة (QR Code) المتوافقة مع متطلبات هيئة الزكاة والضريبة والجمارك.</p>
        <h3 class="text-xl font-bold text-slate-900 pt-2">2. السرعة والاعتمادية</h3>
        <p>تضمن قارئات الباركود السريعة وأجهزة اللمس الصناعية سرعة خدمة العملاء وتفادي فترات الانتظار الطويلة.</p>
      `,
      en: `
        <h3 class="text-xl font-bold text-slate-900 pt-2">1. ZATCA E-Invoicing Compatibility</h3>
        <p>Ensure your POS and thermal printers fully support phase 2 e-invoicing QR codes and compliance requirements.</p>
        <h3 class="text-xl font-bold text-slate-900 pt-2">2. Performance and Durability</h3>
        <p>Industrial-grade touchscreens and swift barcode scanners prevent bottleneck delays at checkout.</p>
      `
    },
    readTime: 4,
    date: '2026-01-28',
    author: { name: 'سارة الدوسري', role: 'أخصائية حلول الأعمال' }
  },
  {
    slug: 'laptop-buying-guide-students-professionals',
    icon: '💻',
    categoryName: { ar: 'لاب توب وكمبيوتر', en: 'Laptops & Computers' },
    title: {
      ar: 'دليل شراء اللابتوب المناسب للعمل والدراسة: المواصفات والميزانية',
      en: 'Laptop Buying Guide for Work & Study: Specs and Budget'
    },
    excerpt: {
      ar: 'كل ما تحتاج معرفته عن أحدث المعالجات، الذاكرة العشوائية RAM وبطاقات الرسوميات لاختيار جهاز يلبي تطلعاتك بأفضل قيمة.',
      en: 'Everything you need to know about the latest processors, RAM, and graphics cards to choose the best laptop value.'
    },
    content: {
      ar: `
        <h3 class="text-xl font-bold text-slate-900 pt-2">1. المعالج (CPU) والذاكرة (RAM)</h3>
        <p>يوصى بذاكرة لا تقل عن 16GB RAM مع معالجات Intel Core Ultra أو AMD Ryzen 8000 لضمان سلاسة تعدد المهام واستخدام أدوات الذكاء الاصطناعي.</p>
        <h3 class="text-xl font-bold text-slate-900 pt-2">2. سرعة التخزين SSD</h3>
        <p>تضمن أقراص NVMe SSD إقلاع النظام في ثوانٍ معدودة وتشغيل البرامج الكبيرة دون أي تباطؤ.</p>
      `,
      en: `
        <h3 class="text-xl font-bold text-slate-900 pt-2">1. Processor (CPU) & RAM</h3>
        <p>At least 16GB RAM with Intel Core Ultra or AMD Ryzen series is recommended for smooth multitasking and AI workloads.</p>
        <h3 class="text-xl font-bold text-slate-900 pt-2">2. NVMe SSD Storage</h3>
        <p>Fast NVMe SSD storage delivers rapid boot times and immediate program loading without delays.</p>
      `
    },
    readTime: 7,
    date: '2026-01-20',
    author: { name: 'م. خالد الحربي', role: 'مهندس حاسبات' }
  },
  {
    slug: 'home-network-setup-speed',
    icon: '📡',
    categoryName: { ar: 'أنظمة الشبكات', en: 'Networks' },
    title: {
      ar: 'أسرار تقوية شبكة الواي فاي وتغطية كامل المنزل بشبكات Mesh',
      en: 'Secrets to Boosting Home Wi-Fi and Full Coverage with Mesh Networks'
    },
    excerpt: {
      ar: 'طرق عملية للقضاء على البقع الميتة وزيادة سرعة الإنترنت المنزلي واختيار أفضل أجهزة الراوتر والموزعات الذكية.',
      en: 'Practical methods to eliminate dead zones and maximize home Wi-Fi speeds with smart Mesh routers.'
    },
    content: {
      ar: `
        <h3 class="text-xl font-bold text-slate-900 pt-2">1. مزايا تقنية Wi-Fi 6 و Mesh</h3>
        <p>تتيح شبكات Mesh توزيع الإشارة بتناغم بين كافة طوابق وغرف المنزل دون انقطاع الاتصال عند التنقل بين الغرف.</p>
        <h3 class="text-xl font-bold text-slate-900 pt-2">2. الموقع المناسب للراوتر</h3>
        <p>ضع الراوتر في مكان مرتفع ومركزي بعيداً عن الجدران الخرسانية السميكة والأجهزة الكهرومغناطيسية لضمان أقصى مدى للتغطية.</p>
      `,
      en: `
        <h3 class="text-xl font-bold text-slate-900 pt-2">1. Wi-Fi 6 & Mesh Systems</h3>
        <p>Mesh systems provide seamless single-network coverage across multi-floor houses without dropping connection.</p>
        <h3 class="text-xl font-bold text-slate-900 pt-2">2. Optimal Router Placement</h3>
        <p>Keep your router elevated and centered away from thick concrete walls and electronic interference.</p>
      `
    },
    readTime: 5,
    date: '2026-01-15',
    author: { name: 'فريق التقنية', role: 'شبكات واتصالات' }
  }
]

const currentArticle = computed(() => {
  return articles.find(a => a.slug === route.params.slug)
})

const copyArticleLink = () => {
  if (process.client) {
    navigator.clipboard.writeText(window.location.href)
    toast.success(
      currentLanguage.value === 'ltr' ? 'Link copied' : 'تم نسخ الرابط',
      currentLanguage.value === 'ltr' ? 'Article link copied to clipboard' : 'تم نسخ رابط المقال إلى الحافظة'
    )
  }
}

useHead({
  title: computed(() => currentArticle.value ? `${currentArticle.value.title[currentLanguage.value as 'ar' | 'en']} | أسوار جدة` : 'المقال | أسوار جدة')
})
</script>
