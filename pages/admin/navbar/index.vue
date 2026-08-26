<template>
  <div class="space-y-6" :dir="adminDir">
    
    <!-- 1. UNIFIED ADMIN PAGE HEADER WITH LANGUAGE TABS -->
    <AdminPageHeader
      title="إدارة شريط التنقل والقوائم (Navbar Manager)"
      subtitle="تحكم كامل في روابط المتجر، القوائم المنسدلة، الشارات الترويجية باللغتين العربية والإنجليزية، والترتيب بالسحب والإفلات."
      icon="fa-solid fa-bars-staggered"
      :breadcrumbs="[
        { label: 'لوحة التحكم', to: '/admin' },
        { label: 'شريط التنقل والقوائم' }
      ]"
      :show-lang-tabs="true"
      v-model:lang-tab="activeLangTab"
    >
      <template #actions>
        <button 
          @click="fetchNavbarItems" 
          :disabled="isLoading"
          class="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
          title="تحديث البيانات"
        >
          <i class="fa-solid fa-rotate text-sm" :class="{ 'fa-spin': isLoading }"></i>
        </button>

        <NuxtLink 
          to="/admin/navbar/create"
          class="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-xs sm:text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <i class="fa-solid fa-plus text-xs"></i>
          <span>إضافة عنصر جديد</span>
        </NuxtLink>
      </template>
    </AdminPageHeader>

    <!-- 2. STATS CARDS -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xl shrink-0">
          <i class="fa-solid fa-list-ul"></i>
        </div>
        <div>
          <span class="text-xs font-bold text-slate-400 block">إجمالي الروابط</span>
          <span class="text-xl sm:text-2xl font-black text-slate-900">{{ totalCount }}</span>
        </div>
      </div>

      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shrink-0">
          <i class="fa-solid fa-layer-group"></i>
        </div>
        <div>
          <span class="text-xs font-bold text-slate-400 block">العناصر الرئيسية</span>
          <span class="text-xl sm:text-2xl font-black text-indigo-600">{{ topLevelCount }}</span>
        </div>
      </div>

      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl shrink-0">
          <i class="fa-solid fa-network-wired"></i>
        </div>
        <div>
          <span class="text-xs font-bold text-slate-400 block">القوائم الفرعية</span>
          <span class="text-xl sm:text-2xl font-black text-purple-600">{{ subItemsCount }}</span>
        </div>
      </div>

      <div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <div>
          <span class="text-xs font-bold text-slate-400 block">العناصر المفعلة</span>
          <span class="text-xl sm:text-2xl font-black text-emerald-600">{{ activeCount }}</span>
        </div>
      </div>
    </div>

    <!-- 3. CONTROLS & SEARCH BAR -->
    <div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="relative w-full sm:w-80">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="بحث في عناصر القوائم..." 
          class="w-full rounded-xl border border-slate-200 bg-slate-50/50 ps-10 pe-4 h-[42px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <i class="fa-solid fa-magnifying-glass absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
        <span class="text-xs font-bold text-slate-500 flex items-center gap-1.5">
          <i class="fa-solid fa-up-down-left-right text-indigo-500"></i>
          اسحب العناصر لإعادة الترتيب تلقائياً
        </span>
      </div>
    </div>

    <!-- 4. NAV ITEMS LIST / TREE CONTAINER -->
    <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <!-- Loading Skeleton -->
      <div v-if="isLoading" class="p-6 space-y-4">
        <div v-for="i in 5" :key="i" class="h-16 bg-slate-50 rounded-2xl animate-pulse border border-slate-100"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredTreeItems.length === 0" class="p-12 text-center">
        <div class="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-2xl mx-auto mb-4">
          <i class="fa-solid fa-bars"></i>
        </div>
        <h3 class="text-base font-black text-slate-800">لا توجد عناصر في شريط التنقل</h3>
        <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          ابدأ بإضافة الروابط الرئيسية والقوائم المنسدلة لمتجرك لتسهيل وصول العملاء للأقسام والمنتجات.
        </p>
        <button 
          @click="openCreateModal(null)"
          class="mt-4 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <i class="fa-solid fa-plus text-xs"></i>
          <span>إضافة أول عنصر</span>
        </button>
      </div>

      <!-- Drag & Drop Items List -->
      <div v-else class="divide-y divide-slate-100">
        <div 
          v-for="(item, index) in filteredTreeItems" 
          :key="item.id"
          draggable="true"
          @dragstart="onDragStart(index, $event)"
          @dragover.prevent="onDragOver(index, $event)"
          @drop.prevent="onDrop(index, $event)"
          @dragend="onDragEnd"
          :class="[
            'p-4 sm:p-5 transition-all duration-200 group/row',
            dragOverIndex === index ? 'bg-indigo-50/80 border-t-2 border-indigo-500 scale-[1.005]' : 'hover:bg-slate-50/70',
            draggedIndex === index ? 'opacity-40 bg-slate-100' : ''
          ]"
        >
          <!-- Main Item Row -->
          <div class="flex items-center justify-between gap-3 sm:gap-4">
            <!-- Left Side: Grip + Icon + Titles + Badges -->
            <div class="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              <!-- Drag Grip Handle -->
              <div class="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-600 p-1 shrink-0 transition-colors" title="اسحب لإعادة الترتيب">
                <i class="fa-solid fa-grip-vertical text-sm"></i>
              </div>

              <!-- Item Icon Preview -->
              <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-sm shrink-0 border border-slate-200/60 shadow-2xs">
                <i v-if="item.icon" :class="item.icon"></i>
                <i v-else class="fa-solid fa-link text-slate-400"></i>
              </div>

              <!-- Details & Title -->
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-extrabold text-slate-900 text-sm sm:text-base">{{ item.title_ar || item.title }}</span>
                  <span v-if="item.title_en && item.title_en !== item.title_ar" class="text-xs text-slate-400 font-medium" dir="ltr">({{ item.title_en }})</span>
                  
                  <!-- Promotional Badge -->
                  <span 
                    v-if="item.badge" 
                    :class="['px-2.5 py-0.5 rounded-full text-[10px] font-black text-white shadow-2xs tracking-wide', resolveBadgeColorClass(item.badge_color)]"
                    :style="resolveBadgeColorStyle(item.badge_color)"
                  >
                    {{ item.badge }}
                  </span>

                  <!-- Type Badge -->
                  <span :class="['px-2 py-0.5 rounded-md text-[10px] font-bold border', resolveTypeBadge(item.type)]">
                    {{ resolveTypeName(item.type) }}
                  </span>

                  <!-- Target Badge -->
                  <span v-if="item.target === '_blank'" class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-bold border border-slate-200" title="يفتح في نافذة جديدة">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> _blank
                  </span>
                </div>

                <!-- URL link -->
                <div class="flex items-center gap-2 mt-1 text-xs text-slate-500 font-mono" dir="ltr">
                  <span class="truncate max-w-[280px] sm:max-w-md text-slate-600">{{ item.url }}</span>
                </div>
              </div>
            </div>

            <!-- Right Side: Status Toggle + Add Child + Edit + Delete -->
            <div class="flex items-center gap-2 sm:gap-3 shrink-0" draggable="false">
              <!-- Active Switch Toggle -->
              <button 
                type="button"
                @click="toggleActiveStatus(item)"
                class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                :class="item.is_active === 1 || item.is_active === true ? 'bg-emerald-500' : 'bg-slate-300'"
                :title="item.is_active === 1 || item.is_active === true ? 'مفعل (انقر للتعطيل)' : 'معطل (انقر للتفعيل)'"
              >
                <span 
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out"
                  :class="item.is_active === 1 || item.is_active === true ? (adminDir === 'rtl' ? '-translate-x-5' : 'translate-x-5') : 'translate-x-0'"
                />
              </button>

              <!-- Add Sub-item Button -->
              <NuxtLink 
                :to="`/admin/navbar/create?parent_id=${item.id}`"
                class="px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors hidden sm:flex items-center gap-1 cursor-pointer"
                title="إضافة عنصر فرعي منسدل أسفل هذا الرابط"
              >
                <i class="fa-solid fa-plus text-[10px]"></i>
                <span>+ فرعي</span>
              </NuxtLink>

              <!-- Edit Button -->
              <NuxtLink 
                :to="`/admin/navbar/${item.id}`"
                class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-600 flex items-center justify-center transition-colors cursor-pointer"
                title="تعديل العنصر"
              >
                <i class="fa-solid fa-pen text-xs"></i>
              </NuxtLink>

              <!-- Delete Button -->
              <button 
                type="button" 
                @click.stop="handleDelete(item)"
                class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                title="حذف العنصر"
              >
                <i class="fa-solid fa-trash text-xs"></i>
              </button>
            </div>
          </div>

          <!-- Nested Children Sub-Items (Hierarchy Level 2) -->
          <div v-if="Array.isArray(item.children) && item.children.length > 0" class="mt-3.5 space-y-2 ps-6 sm:ps-10 border-s-2 border-indigo-100 ms-3 sm:ms-5 pt-1">
            <div 
              v-for="sub in item.children" 
              :key="sub.id"
              class="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 flex items-center justify-between gap-3 hover:bg-white transition-colors"
            >
              <div class="flex items-center gap-2.5 min-w-0 flex-1">
                <span class="text-indigo-400 font-bold text-xs shrink-0">↳</span>
                
                <div class="w-7 h-7 rounded-lg bg-white text-slate-600 flex items-center justify-center text-xs shrink-0 border border-slate-200">
                  <i v-if="sub.icon" :class="sub.icon"></i>
                  <i v-else class="fa-solid fa-arrow-turn-down text-slate-400 rotate-270"></i>
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="font-bold text-slate-800 text-xs sm:text-sm">{{ sub.title_ar || sub.title }}</span>
                    <span v-if="sub.badge" :class="['px-2 py-0.2 rounded-full text-[9px] font-black text-white', resolveBadgeColorClass(sub.badge_color)]" :style="resolveBadgeColorStyle(sub.badge_color)">
                      {{ sub.badge }}
                    </span>
                  </div>
                  <span class="text-[11px] text-slate-500 font-mono block truncate" dir="ltr">{{ sub.url }}</span>
                </div>
              </div>

              <!-- Sub Actions -->
              <div class="flex items-center gap-1.5 shrink-0" draggable="false">
                <button 
                  type="button" 
                  @click.stop="toggleActiveStatus(sub)"
                  class="w-6 h-6 rounded-lg text-xs flex items-center justify-center transition-colors cursor-pointer"
                  :class="sub.is_active === 1 || sub.is_active === true ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 bg-slate-200'"
                  :title="sub.is_active === 1 || sub.is_active === true ? 'مفعل' : 'معطل'"
                >
                  <i class="fa-solid fa-circle text-[8px]"></i>
                </button>

                <NuxtLink 
                  :to="`/admin/navbar/${sub.id}`"
                  class="w-7 h-7 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center transition-colors cursor-pointer"
                  title="تعديل"
                >
                  <i class="fa-solid fa-pen text-[10px]"></i>
                </NuxtLink>

                <button 
                  type="button" 
                  @click.stop="handleDelete(sub)"
                  class="w-7 h-7 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"
                  title="حذف"
                >
                  <i class="fa-solid fa-trash text-[10px]"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. CREATE / EDIT MODAL FORM -->
    <BaseModal 
      :is-open="isFormModalOpen" 
      :title="editingItem ? 'تعديل عنصر في شريط التنقل' : 'إضافة عنصر جديد لشريط التنقل'"
      @close="isFormModalOpen = false"
    >
      <form @submit.prevent="handleSubmitForm" class="space-y-5">
        <!-- Titles (AR & EN) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BaseInput 
            v-model="formData.title_ar" 
            label="العنوان بالعربية *" 
            placeholder="مثال: الأجهزة المنزلية" 
            required 
          />
          <BaseInput 
            v-model="formData.title_en" 
            label="العنوان بالإنجليزية (English)" 
            placeholder="e.g. Home Appliances" 
            dir="ltr" 
          />
        </div>

        <!-- Type Selector -->
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-slate-700">نوع العنصر في القائمة</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button 
              type="button" 
              v-for="tOpt in typeOptions" 
              :key="tOpt.value"
              @click="onTypeSelect(tOpt.value)"
              :class="[
                'p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer',
                formData.type === tOpt.value 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20 shadow-xs' 
                  : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100'
              ]"
            >
              <i :class="tOpt.icon"></i>
              <span>{{ tOpt.label }}</span>
            </button>
          </div>
        </div>

        <!-- Quick Autocomplete for Category / Brand -->
        <div v-if="formData.type === 'category'" class="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-2">
          <label class="block text-xs font-black text-amber-900">اختر القسم من قاعدة البيانات لتوليد الرابط تلقائياً</label>
          <select 
            @change="onCategoryAutofill($event)"
            class="w-full rounded-xl border border-amber-300 bg-white px-3 h-[40px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <option value="">-- اختر القسم --</option>
            <option v-for="cat in dbCategories" :key="cat.id" :value="cat.slug">{{ cat.name }}</option>
          </select>
        </div>

        <div v-if="formData.type === 'brand'" class="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-200/80 space-y-2">
          <label class="block text-xs font-black text-indigo-900">اختر الماركة من قاعدة البيانات لتوليد الرابط تلقائياً</label>
          <select 
            @change="onBrandAutofill($event)"
            class="w-full rounded-xl border border-indigo-300 bg-white px-3 h-[40px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="">-- اختر الماركة --</option>
            <option v-for="b in dbBrands" :key="b.id" :value="b.slug">{{ b.name }}</option>
          </select>
        </div>

        <!-- URL & Target -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="sm:col-span-2">
            <BaseInput 
              v-model="formData.url" 
              label="الرابط المستهدف (URL) *" 
              placeholder="/category/kitchen-appliances أو https://..." 
              dir="ltr" 
              required 
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700">فتح الرابط في</label>
            <select 
              v-model="formData.target" 
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 h-[44px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="_self">نفس الصفحة (_self)</option>
              <option value="_blank">علامة تبويب جديدة (_blank)</option>
            </select>
          </div>
        </div>

        <!-- Parent Item Selector (For Dropdowns) -->
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-slate-700">العنصر الأب (Parent Menu Item)</label>
          <select 
            v-model="formData.parent_id" 
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 h-[44px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option :value="null">-- عنصر رئيسي في شريط التنقل (بدون أب) --</option>
            <option 
              v-for="p in availableParentOptions" 
              :key="p.id" 
              :value="p.id"
            >
              ↳ {{ p.title_ar || p.title }}
            </option>
          </select>
          <p class="text-[11px] text-slate-400">إذا اخترت عنصراً أباً، فسيظهر هذا الرابط كخيار منسدل فرعي تحته.</p>
        </div>

        <!-- Promotional Badge & Badge Color -->
        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
          <h5 class="text-xs font-black text-slate-800 flex items-center gap-1.5">
            <i class="fa-solid fa-tag text-indigo-500"></i>
            الشارة الترويجية (Badge)
          </h5>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput 
              v-model="formData.badge" 
              label="نص الشارة (اختياري)" 
              placeholder="مثال: HOT, جديد, خصم 20%" 
            />

            <!-- Preset Color Picker -->
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-700">لون الشارة</label>
              <div class="flex items-center gap-2">
                <input 
                  type="color" 
                  v-model="formData.badge_color" 
                  class="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-1 shrink-0"
                />
                <input 
                  type="text" 
                  v-model="formData.badge_color" 
                  placeholder="#ef4444 أو bg-rose-500" 
                  class="flex-1 rounded-xl border border-slate-200 bg-white px-3 h-[40px] text-xs font-mono"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          <!-- Color Quick Presets -->
          <div class="flex items-center gap-2 flex-wrap pt-1">
            <span class="text-[11px] font-bold text-slate-400">ألوان جاهزة:</span>
            <button 
              type="button" 
              v-for="preset in colorPresets" 
              :key="preset.color"
              @click="formData.badge_color = preset.color"
              class="px-2 py-0.5 rounded-md text-[10px] font-bold text-white transition-transform hover:scale-105 cursor-pointer"
              :style="{ backgroundColor: preset.color }"
            >
              {{ preset.name }}
            </button>
          </div>
        </div>

        <!-- Icon & Status -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700">أيقونة العنصر (FontAwesome Class)</label>
            <div class="flex items-center gap-2">
              <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-sm shrink-0 border border-slate-200">
                <i v-if="formData.icon" :class="formData.icon"></i>
                <i v-else class="fa-solid fa-icons text-slate-400"></i>
              </div>
              <input 
                type="text" 
                v-model="formData.icon" 
                placeholder="fa-solid fa-tag" 
                class="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-3 h-[40px] text-xs font-mono"
                dir="ltr"
              />
            </div>
          </div>

          <!-- Is Active Toggle -->
          <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 sm:mt-4">
            <div>
              <span class="text-xs font-black text-slate-800 block">تفعيل العنصر في المتجر</span>
              <span class="text-[10px] text-slate-500">إظهار العنصر فورياً في الناف بار</span>
            </div>
            <input 
              type="checkbox" 
              v-model="formData.is_active" 
              class="w-5 h-5 text-indigo-600 rounded cursor-pointer accent-indigo-600"
            />
          </div>
        </div>

        <!-- Submit / Cancel -->
        <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button 
            type="button" 
            @click="isFormModalOpen = false"
            class="px-4 py-2.5 text-slate-600 hover:text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            إلغاء
          </button>
          
          <button 
            type="submit" 
            :disabled="isSubmitting"
            class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <i v-if="isSubmitting" class="fa-solid fa-spinner fa-spin text-xs"></i>
            <i v-else class="fa-solid fa-check text-xs"></i>
            <span>{{ isSubmitting ? 'جاري الحفظ...' : (editingItem ? 'حفظ التعديلات' : 'تأكيد الإضافة') }}</span>
          </button>
        </div>
      </form>
    </BaseModal>

    <!-- 6. DELETE CONFIRMATION MODAL -->
    <BaseModal 
      :is-open="isDeleteModalOpen" 
      title="تأكيد حذف عنصر القائمة" 
      @close="isDeleteModalOpen = false"
    >
      <div class="space-y-4">
        <div class="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-lg shrink-0">
            <i class="fa-solid fa-triangle-exclamation"></i>
          </div>
          <div>
            <h4 class="text-sm font-black text-rose-900">هل أنت متأكد من حذف هذا العنصر؟</h4>
            <p class="text-xs text-rose-700 mt-0.5">
              سيتم حذف "<span class="font-bold">{{ itemToDelete?.title_ar || itemToDelete?.title }}</span>" 
              وكافة العناصر الفرعية المنسدلة التابعة له نهائياً من شريط التنقل.
            </p>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button 
            type="button" 
            @click="isDeleteModalOpen = false"
            class="px-4 py-2 text-slate-600 hover:text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            إلغاء
          </button>

          <button 
            type="button" 
            @click="executeDelete"
            :disabled="deletingId !== null"
            class="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <i v-if="deletingId !== null" class="fa-solid fa-spinner fa-spin text-xs"></i>
            <i v-else class="fa-solid fa-trash text-xs"></i>
            <span>تأكيد الحذف النهائي</span>
          </button>
        </div>
      </div>
    </BaseModal>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import AdminPageHeader from '~/components/dashboard/ui/AdminPageHeader.vue'
import AdminLangTabs from '~/components/dashboard/ui/AdminLangTabs.vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseModal from '~/components/dashboard/ui/BaseModal.vue'
import { useAdminNavbar } from '~/composables/useAdminNavbar'
import { useAdminLanguage } from '~/composables/useAdminLanguage'
import type { NavbarItem } from '~/services/adminNavbarApiService'

definePageMeta({
  layout: 'dashboard'
})

const { t, adminDir } = useAdminLanguage()

useHead({
  title: 'إدارة شريط التنقل والقوائم (Navbar Manager) | لوحة تحكم أسوار جدة'
})

const activeLangTab = ref<'ar' | 'en'>('ar')

const {
  rawItems,
  treeItems,
  parentOptions,
  totalCount,
  topLevelCount,
  subItemsCount,
  activeCount,
  isLoading,
  isSubmitting,
  isReordering,
  deletingId,
  dbCategories,
  dbBrands,
  fetchNavbarItems,
  fetchAutocompleteOptions,
  createNavbarItem,
  updateNavbarItem,
  deleteNavbarItem,
  toggleActiveStatus,
  reorderNavbarItems
} = useAdminNavbar()

const searchQuery = ref('')
const isFormModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const editingItem = ref<NavbarItem | null>(null)
const itemToDelete = ref<NavbarItem | null>(null)

// Drag & Drop State
const draggedIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

const formData = reactive({
  title_ar: '',
  title_en: '',
  type: 'link',
  url: '/',
  target: '_self',
  parent_id: null as number | string | null,
  badge: '',
  badge_color: '#ef4444',
  icon: '',
  is_active: true
})

const typeOptions = [
  { value: 'link', label: 'رابط مباشر', icon: 'fa-solid fa-link' },
  { value: 'dropdown', label: 'قائمة منسدلة', icon: 'fa-solid fa-layer-group' },
  { value: 'category', label: 'قسم من المتجر', icon: 'fa-solid fa-folder-tree' },
  { value: 'brand', label: 'ماركة تجارية', icon: 'fa-solid fa-tag' }
]

const colorPresets = [
  { name: 'أحمر', color: '#ef4444' },
  { name: 'برتقالي', color: '#f97316' },
  { name: 'ذهبي', color: '#f59e0b' },
  { name: 'أخضر', color: '#10b981' },
  { name: 'أزرق', color: '#3b82f6' },
  { name: 'بنفسجي', color: '#8b5cf6' },
  { name: 'وردي', color: '#ec4899' }
]

// Filtered Tree List based on search
const filteredTreeItems = computed(() => {
  if (!searchQuery.value.trim()) return treeItems.value
  const q = searchQuery.value.trim().toLowerCase()
  return treeItems.value.filter(item => 
    item.title.toLowerCase().includes(q) ||
    (item.title_ar && item.title_ar.toLowerCase().includes(q)) ||
    (item.title_en && item.title_en.toLowerCase().includes(q)) ||
    item.url.toLowerCase().includes(q) ||
    (item.children && item.children.some(c => c.title.toLowerCase().includes(q)))
  )
})

// Available parent options (excluding current editing item to prevent cyclic tree)
const availableParentOptions = computed(() => {
  if (!editingItem.value) return parentOptions.value
  return parentOptions.value.filter(p => String(p.id) !== String(editingItem.value!.id))
})

onMounted(async () => {
  await Promise.all([
    fetchNavbarItems(),
    fetchAutocompleteOptions()
  ])
})

// ----------------- Drag & Drop Handlers -----------------
const onDragStart = (index: number, event: DragEvent) => {
  draggedIndex.value = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(index))
  }
}

const onDragOver = (index: number, event: DragEvent) => {
  if (draggedIndex.value === null || draggedIndex.value === index) return
  dragOverIndex.value = index
}

const onDrop = async (targetIndex: number, event: DragEvent) => {
  if (draggedIndex.value === null || draggedIndex.value === targetIndex) {
    draggedIndex.value = null
    dragOverIndex.value = null
    return
  }

  const fromIdx = draggedIndex.value
  const list = [...filteredTreeItems.value]
  const [moved] = list.splice(fromIdx, 1)
  list.splice(targetIndex, 0, moved)

  draggedIndex.value = null
  dragOverIndex.value = null

  await reorderNavbarItems(list)
}

const onDragEnd = () => {
  draggedIndex.value = null
  dragOverIndex.value = null
}

// ----------------- Form Handlers -----------------
const openCreateModal = (parentId: number | string | null = null) => {
  editingItem.value = null
  formData.title_ar = ''
  formData.title_en = ''
  formData.type = 'link'
  formData.url = '/'
  formData.target = '_self'
  formData.parent_id = parentId
  formData.badge = ''
  formData.badge_color = '#ef4444'
  formData.icon = ''
  formData.is_active = true
  isFormModalOpen.value = true
}

const openEditModal = (item: NavbarItem) => {
  editingItem.value = item
  formData.title_ar = item.title_ar || item.title || ''
  formData.title_en = item.title_en || ''
  formData.type = item.type || 'link'
  formData.url = item.url || '/'
  formData.target = item.target || '_self'
  formData.parent_id = item.parent_id || null
  formData.badge = item.badge || ''
  formData.badge_color = item.badge_color || '#ef4444'
  formData.icon = item.icon || ''
  formData.is_active = item.is_active === 1 || item.is_active === true
  isFormModalOpen.value = true
}

const onTypeSelect = (typeVal: string) => {
  formData.type = typeVal
  if (typeVal === 'dropdown') {
    formData.url = '#'
  }
}

const onCategoryAutofill = (event: Event) => {
  const select = event.target as HTMLSelectElement
  const slug = select.value
  if (!slug) return

  const found = dbCategories.value.find(c => c.slug === slug)
  if (found) {
    if (!formData.title_ar) formData.title_ar = found.name
    formData.url = `/category/${found.slug}`
  }
}

const onBrandAutofill = (event: Event) => {
  const select = event.target as HTMLSelectElement
  const slug = select.value
  if (!slug) return

  const found = dbBrands.value.find(b => b.slug === slug)
  if (found) {
    if (!formData.title_ar) formData.title_ar = found.name
    formData.url = `/brand/${found.slug}`
  }
}

const handleSubmitForm = async () => {
  const payload = {
    title: formData.title_ar,
    title_ar: formData.title_ar,
    title_en: formData.title_en || formData.title_ar,
    type: formData.type,
    url: formData.url,
    target: formData.target,
    parent_id: formData.parent_id,
    badge: formData.badge || undefined,
    badge_color: formData.badge ? formData.badge_color : undefined,
    icon: formData.icon || undefined,
    is_active: formData.is_active ? 1 : 0
  }

  if (editingItem.value) {
    await updateNavbarItem(editingItem.value.id, payload)
  } else {
    await createNavbarItem(payload)
  }

  isFormModalOpen.value = false
}

// ----------------- Delete Handlers -----------------
const handleDelete = async (item: NavbarItem) => {
  if (!item || !item.id) return
  const title = item.title_ar || item.title || 'هذا العنصر'
  if (confirm(`هل أنت متأكد من حذف "${title}" نهائياً من شريط التنقل؟`)) {
    try {
      await deleteNavbarItem(item.id)
    } catch (err) {
      console.error('Delete execution error:', err)
    }
  }
}

// ----------------- Helpers -----------------
const resolveTypeName = (type: string) => {
  switch (type) {
    case 'dropdown': return 'قائمة منسدلة'
    case 'category': return 'قسم متجر'
    case 'brand': return 'علامة تجارية'
    case 'page': return 'صفحة مخصصة'
    default: return 'رابط مباشر'
  }
}

const resolveTypeBadge = (type: string) => {
  switch (type) {
    case 'dropdown': return 'bg-purple-50 text-purple-700 border-purple-200'
    case 'category': return 'bg-amber-50 text-amber-800 border-amber-200'
    case 'brand': return 'bg-indigo-50 text-indigo-700 border-indigo-200'
    case 'page': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    default: return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}

const resolveBadgeColorClass = (color?: string) => {
  if (!color) return 'bg-rose-500'
  if (color.startsWith('bg-')) return color
  return ''
}

const resolveBadgeColorStyle = (color?: string) => {
  if (color && (color.startsWith('#') || color.startsWith('rgb'))) {
    return { backgroundColor: color }
  }
  return {}
}
</script>
