---
layout: post
title: "CPU Cache Belleği Nedir? L1, L2 ve L3 Nasıl Çalışır?"
description: "İşlemci önbelleğinin temel çalışma mantığını, L1i ve L1D ayrımını ve bellek katmanları arasındaki farkları inceleyelim."
date: 2026-11-05 10:30:00 +0300
categories: [Donanım]
tags: [CPU, Cache, Bellek Mimarisi, L1, L2, L3]
featured: true
reading_time: "6 dk okuma"
---

İşlemciler, komutları ve verileri ana bellekten (RAM) her seferinde bekleyerek almak zorunda kalsaydı, performanslarının önemli bir bölümü bellek erişim gecikmesiyle sınırlanırdı. **CPU cache**, işlemcinin sık veya yakın zamanda ihtiyaç duyabileceği verileri daha hızlı erişilebilen küçük bellek alanlarında tutarak bu beklemeyi azaltır.

Bu yazıda önbelleğin temel mantığını ve L1, L2, L3 seviyelerinin birbirinden nasıl ayrıldığını ele alacağız.

<!--more-->

## CPU cache neden var?

İşlemci çekirdekleri, modern RAM'e kıyasla çok daha hızlı çalışabilir. İşlemcinin ihtiyaç duyduğu veri RAM'den gelene kadar beklemesi, işlem hattında boşluklar oluşmasına neden olabilir. Önbellek, sık kullanılan verilerin işlemciye daha yakın tutulmasını sağlayarak ortalama erişim süresini düşürmeye yardımcı olur.

Cache belleğin temel özellikleri şunlardır:

- **Düşük erişim gecikmesi:** RAM'e kıyasla işlemciye daha hızlı veri sağlayabilir.
- **Sınırlı kapasite:** Hız ve maliyet dengesi nedeniyle RAM'den çok daha küçüktür.
- **Otomatik yönetim:** Verilerin hangi seviyede tutulacağı çoğunlukla donanım tarafından yönetilir.

## L1, L2 ve L3 seviyeleri

Önbellek hiyerarşisi genellikle kapasite ve erişim süresi arasında bir denge kurar. İşlemciye yakın olan seviyeler daha hızlı ve küçük; daha alt seviyeler ise genellikle daha büyük ve görece daha yavaştır.

| Seviye | Genel özellik | Tipik konum |
| --- | --- | --- |
| L1 | En düşük gecikme, en küçük kapasite | Çekirdek başına |
| L2 | L1'den büyük, L1'den daha yüksek gecikme | Çekirdek başına veya mimariye bağlı |
| L3 | Daha büyük kapasite, daha yüksek gecikme | Çoğunlukla çekirdekler arasında paylaşımlı |

Bu özellikler işlemci ailesine ve mimariye göre değişebilir; her işlemcide aynı kapasite veya paylaşım modeli bulunmaz.

## L1i ve L1D ayrımı

L1 önbelleğin önemli tasarım özelliklerinden biri, komut ve veri önbelleğinin ayrı tutulabilmesidir:

- **L1i (Instruction Cache):** İşlemcinin çalıştıracağı komutları tutar.
- **L1D (Data Cache):** Komutların ihtiyaç duyduğu verileri tutar.

Bu ayrım, komut getirme ve veri erişimi işlemlerinin aynı önbellek alanı için rekabet etmesini azaltabilir. Bu tasarım genellikle *Harvard mimarisi yaklaşımı* olarak anılır. L1i ve L1D'nin kapasitesi ve ayrıntıları işlemci modeline göre değişir.

## Cache hit ve cache miss

İşlemci aradığı veriyi ilgili önbellek seviyesinde bulursa buna **cache hit** denir. Veri o seviyede bulunamazsa **cache miss** oluşur ve arama daha alt seviyelerde veya ana bellekte devam eder.

Basitleştirilmiş akış şöyle düşünülebilir:

```text
CPU bir veri ister
       │
       ▼
     L1 Cache ── hit ──► Veri sağlanır
       │ miss
       ▼
     L2 Cache ── hit ──► Veri sağlanır
       │ miss
       ▼
     L3 Cache ── hit ──► Veri sağlanır
       │ miss
       ▼
       RAM
```

Bu şema kavramsal bir anlatımdır. Gerçek işlemcilerde önceden getirme (prefetch), eşzamanlı erişimler ve farklı önbellek politikaları gibi ek mekanizmalar bulunur.

## Sonuç

CPU cache, işlemcinin hızını yalnızca saat frekansını artırarak değil, veriye ne kadar hızlı ulaşabildiğini iyileştirerek destekleyen temel bileşenlerden biridir. L1, L2 ve L3 seviyeleri farklı kapasite ve gecikme dengeleri sunar; L1i ve L1D ayrımı ise komutlarla verilerin ayrı önbelleklerde tutulabilmesini sağlar.

Önbellek mimarisini anlamak, işlemci performansını ve bellek erişiminin yazılımlar üzerindeki etkisini yorumlamak için iyi bir başlangıç noktasıdır.
