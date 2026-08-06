/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
            colors: {
                luxury: {
                    black: '#0b1a30',       // أزرق كحلي فاخر جداً
                    dark: '#1a2942',        // كحلي بدرجة أخف للـ Cards
                    cream: '#f9f8f3',       // أوف وايت عاجي فاخر للخلفيات
                    gold: '#e3a228',        // ذهبي اللوجو الأنيق
                    'gold-light': '#d4931a', // ذهبي للـ Hover
                    muted: '#8f8f8f',       // رمادي هادئ للنصوص الثانوية
                }
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}