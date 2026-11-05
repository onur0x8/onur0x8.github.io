---
layout: post
title: "Bellek Tabanlı Zararlı Yazılımlar Nedir?"
description: "Dosya sisteminde kalıcı bir iz bırakmadan veya bellekte çalışan bileşenler kullanarak etkinlik gösteren tehditleri savunma perspektifiyle tanıyalım."
date: 2026-11-05 11:30:00 +0300
categories: [Siber Güvenlik]
tags: [Bellek, Zararlı Yazılım, Savunma, EDR]
reading_time: "5 dk okuma"
---

Bazı zararlı yazılım teknikleri, geleneksel bir dosya olarak diskte bulunmak yerine çalışan bir sürecin belleğinden yararlanabilir. Bu nedenle yalnızca dosya taramasına dayanan güvenlik yaklaşımı, sistemdeki bütün şüpheli davranışları açıklamakta yetersiz kalabilir.

Bu yazıda bellek üzerinde çalışan tehditleri kavramsal düzeyde inceleyip savunma tarafında hangi sinyallerin anlamlı olabileceğine bakacağız.

<!--more-->

## Bellek üzerinde çalışma ne anlama gelir?

Bir program çalışırken kodu, verileri ve çalışma durumu RAM'de tutulur. Bellek tabanlı tehditler, kötü amaçlı etkinliklerinin bir bölümünü bu çalışma alanında gerçekleştirebilir. Bazı örneklerde diskte bir dosya da bulunabilir; bazılarında ise saldırganın amacı diske bırakılan izleri azaltmaktır.

Bu davranış tek bir zararlı yazılım ailesini tanımlamaz. Farklı tehdit grupları benzer bellek tekniklerinden yararlanabilir.

## Neden yalnızca dosya taraması yeterli olmayabilir?

Geleneksel antivirüs kontrolleri dosyaları incelemek açısından değerlidir. Ancak çalışan süreçlerdeki şüpheli davranışlar, bellek içi modüller veya olağandışı süreç ilişkileri ayrıca izlenmelidir.

Savunma ekipleri bu nedenle birden fazla telemetri kaynağını birlikte değerlendirir:

- **Süreç davranışı:** Bir uygulamanın beklenmeyen alt süreçler başlatması veya alışılmadık işlemler yapması.
- **Bellek davranışı:** Süreç belleğinde beklenmeyen yürütülebilir alanların veya olağandışı değişikliklerin görülmesi.
- **Ağ etkinliği:** Uygulamanın rolüyle uyuşmayan bağlantı davranışları.
- **Olay günlükleri:** İşletim sistemi ve uç nokta güvenlik kayıtlarının birbiriyle ilişkilendirilmesi.

Tek bir belirti kesin olarak zararlı yazılım anlamına gelmez. Bulgular bağlam içinde değerlendirilmelidir.

## Savunma yaklaşımı

Bellek tabanlı tehditlere karşı daha güçlü bir görünürlük için uç nokta algılama ve müdahale (EDR) çözümleri, davranış analizi, güncel işletim sistemi bileşenleri ve merkezi günlük toplama birlikte kullanılabilir.

Bir güvenlik incelemesinde şu sorular yararlıdır:

1. İlgili süreci hangi uygulama başlattı?
2. Sürecin normal işleviyle uyuşmayan davranış var mı?
3. Aynı zaman aralığında olağandışı ağ veya kimlik doğrulama olayları gerçekleşti mi?
4. Güvenlik ürünü tarafından üretilen uyarılar başka telemetriyle doğrulanabiliyor mu?

## Sonuç

Bellek tabanlı zararlı yazılımlar, güvenliğin yalnızca diskteki dosyaları taramaktan ibaret olmadığını gösterir. Süreç davranışı, bellek etkinliği ve ağ telemetrisi birlikte ele alındığında daha anlamlı bir güvenlik görünürlüğü elde edilir.
