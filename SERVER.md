# SERVER.md

Bu fayl serverning joriy holatini hujjatlashtiradi. So'nggi yangilangan: 2026-08-19.

## Provayder va manzil

- Provayder: Hetzner Cloud
- Server turi: CX33
- IP (IPv4): 204.168.244.42
- IP (IPv6): 2a01:4f9:c014:a4f6::/64
- CPU: 4 core
- RAM: 7.6 GB
- Disk: 75 GB (12 GB band, 61 GB bo'sh)

## OS

- Ubuntu 24.04.1 LTS
- Kernel: 6.8.0-137-generic

## O'rnatilgan dasturlar va versiyalari

| Dastur | Versiya | Vazifasi |
|---|---|---|
| Docker | 27.5.1 | Konteyner boshqaruvi (Swarm rejimida) |
| Easypanel | latest (panel v2.33.1) | Server/deploy boshqaruv paneli |
| Traefik | 3.6.7 | Reverse proxy, SSL terminatsiya |
| nginx | 1.31.3 | `mysite` xizmatida statik fayllarni xizmat qiladi |
| n8n | 2.18.2 | Workflow avtomatlashtirish |
| UFW | o'rnatilgan, faol | Firewall |
| fail2ban | o'rnatilgan, faol | Brute-force himoyasi (SSH) |

Eslatma: Caddy ishlatilmaydi — reverse proxy vazifasini Traefik bajaradi.

## Domen va DNS

- Domen: `eslatvoy.uz`
- Registrator: SUVAN NET
- Nameserver: Cloudflare (`katelyn.ns.cloudflare.com`, `porter.ns.cloudflare.com`)
- DNS rejimi: Cloudflare proxy yoqilgan (orange cloud) — tashqi so'rovlar avval Cloudflare orqali o'tadi, keyin serverga yetadi
- SSL: Let's Encrypt sertifikat, Traefik orqali avtomatik yangilanadi (muddati ~90 kun)

## Ishlab turgan xizmatlar va portlar

| Xizmat | Tashqi port | Izoh |
|---|---|---|
| SSH | 22/tcp | Faqat kalit orqali kirish, rate-limited |
| HTTP | 80/tcp | Traefik, HTTPS'ga avtomatik yo'naltiradi |
| HTTPS | 443/tcp | Traefik, SSL terminatsiya |
| Easypanel panel | 3000/tcp | Boshqaruv paneli, rate-limited |

Ichki xizmatlar (tashqariga ochiq emas, faqat Traefik orqali):

| Xizmat | Ichki port | Domen |
|---|---|---|
| mysite (statik sayt) | 80 | eslatvoy.uz |
| n8n | 5678 | n8n.rahmatxoja.uz |
| antispam bot | — (tashqi portsiz, alohida docker-compose loyihasi) | — |

Docker Swarm boshqaruv portlari (2377, 7946) faqat serverning o'zida ochiq, tashqi firewall (UFW) orqali internetdan yopilgan.

## Loglarni qayerdan ko'rish

- **Easypanel UI orqali**: Loyiha → xizmat → "Логи" (Logs) bo'limi — real vaqtda
- **SSH orqali**: `docker service logs <xizmat_nomi>` (masalan: `docker service logs eslatvoy_mysite`)
- **fail2ban holati**: `fail2ban-client status sshd`
- **Tizim loglari**: `journalctl -u ssh`, `journalctl -u docker`

## Xavfsizlik holati

- Firewall (UFW) faol, faqat kerakli portlar ochiq
- SSH parol orqali kirish o'chirilgan, faqat kalit orqali
- fail2ban SSH brute-force hujumlariga qarshi faol
- Saytda HSTS, X-Frame-Options, X-Content-Type-Options va boshqa xavfsizlik headerlari o'rnatilgan
