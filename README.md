# Kişisel Teknik Günlük — GitHub Pages

Minimal, responsive ve salt okunur bir kişisel blog. Jekyll ile hazırlanmıştır; ziyaretçiler yalnızca yayınlanan yazıları okuyabilir. İçerik ekleme veya düzenleme arayüzü bulunmaz.

## Özellikler

- Açık / koyu tema (tercih tarayıcıda saklanır)
- Mobil uyumlu gezinme
- Makale arşivi ve kategori sayfası
- Başlık, açıklama ve kategori alanlarında istemci taraflı arama
- Makale içindekiler listesi, okuma ilerleme çubuğu
- Kod blokları için kopyalama butonu
- RSS akışı (`/feed.xml`)
- Jekyll + GitHub Pages + GitHub Actions dağıtımı

## 1. Depoyu oluştur

1. GitHub'da yeni bir **public repository** oluştur.
2. Depo adını `KULLANICI.github.io` yaparsan kullanıcı sitesi adresin `https://KULLANICI.github.io` olur. Proje deposu kullanırsan adres biçimi `https://KULLANICI.github.io/DEPO-ADI/` olur.
3. Bu klasörün içindeki dosyaları deponun kök dizinine yükle ve `main` dalına gönder.

## 2. Site ayarlarını düzenle

`_config.yml` dosyasında aşağıdaki alanları kendine göre değiştir:

```yml
title: "Kişisel Teknik Günlük"
url: "https://KULLANICI.github.io"
baseurl: ""
profile_name: "Adın Soyadın"
profile_role: "Teknoloji meraklısı · Öğrenen · Üreten"
github_username: "github-kullanici-adin"
contact_email: "ornek@eposta.com"
```

- `url`: sitenin gerçek alan adı. Örnek: `https://octocat.github.io`
- `baseurl`: kullanıcı/organizasyon deposu için boş bırak. Proje deposu için `"/DEPO-ADI"` yaz.
- `github_username` ve `contact_email`: kullanmak istemiyorsan boş bırak.

Ayrıca `hero_title` ve `hero_description` alanlarından ana sayfa metnini değiştirebilirsin. `hero_title` içinde `<em>...</em>` kullanımı desteklenir.

## 3. GitHub Pages'i etkinleştir

1. Depoda **Settings → Pages** bölümünü aç.
2. **Build and deployment → Source** alanında **GitHub Actions** seç.
3. `main` dalına gönderdiğin her commit, `.github/workflows/pages.yml` iş akışını çalıştırır.
4. İş akışı tamamlandığında Pages adresin yayımlanır.

## 4. Yeni makale ekle

`_posts` klasöründe şu biçimde yeni dosya oluştur:

`YYYY-MM-DD-kisa-baslik.md`

Örnek:

````markdown
---
layout: post
title: "Yeni makale başlığı"
description: "Makaleyi özetleyen kısa açıklama."
date: 2026-11-07 12:00:00 +0300
categories: [Yazılım]
tags: [JavaScript, Web]
reading_time: "4 dk okuma"
---

## İlk bölüm

Makalenin içeriğini Markdown ile yaz.

```js
console.log("Merhaba dünya");
```
````

Dosyayı `main` dalına gönderdiğinde makale otomatik olarak yayımlanır. `featured: true` eklediğin yazı ana sayfada öne çıkar.

## 5. Görsel ekle

Görseli `assets/images/` klasörüne koy. Makale üst görseli için front matter'a şunu ekle:

```yml
cover: /assets/images/gorsel.jpg
cover_alt: "Görselin açıklaması"
cover_caption: "İsteğe bağlı görsel açıklaması"
```

Makale gövdesine görsel eklemek için:

```markdown
![Görsel açıklaması](/assets/images/gorsel.jpg)
```

## Örnek yazılar

`_posts` klasöründeki ilk iki makale tasarımın nasıl göründüğünü göstermek için başlangıç içeriği olarak eklenmiştir. Yayınlamadan önce gözden geçir, kendi anlatımına göre düzenle veya sil.

## Güvenlik ve içerik modeli

Site statik olarak üretilir. Ziyaretçilerin makale oluşturabileceği, düzenleyebileceği veya silebileceği bir form ya da yönetim paneli yoktur. Yayın içeriği yalnızca depo üzerinde yazma yetkisi olan kişilerin commit'leriyle değişir. Depoyu herkese açık kullanıyorsan kişisel/özel bilgilerini veya gizli anahtarlarını depoya ekleme.

## Yerelde önizleme (isteğe bağlı)

Ruby ve Bundler kuruluysa:

```bash
bundle install
bundle exec jekyll serve
```

Ardından `http://127.0.0.1:4000` adresini aç.
