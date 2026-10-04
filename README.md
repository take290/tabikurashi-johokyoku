# 旅暮らし情報局

旅するように、その街で暮らす。

松本・白馬・糸魚川から、旅行→数日滞在→暮らしへの関心を検証するWebメディアのMVP。Next.js / TypeScript、Markdownで運営する構成です。

## 現在の状態

**Vercel Hobbyで非商用サイト公開済み**。公開URL: https://tabikurashi-johokyoku.vercel.app/ 。GitHub: https://github.com/take290/tabikurashi-johokyoku 。Supabase・Attio・Resendへの実接続は未確認です。接続が揃うまで問い合わせ受付を停止し、成功表示を出しません。

26ページ（トップ、3地域、10記事、記事一覧、8スタイル、運営、プライバシー、問い合わせ）＋404。検索・絞り込み、関連記事、宿検索CTA、SEO基礎を実装。36件のPlaywright検証に合格しました。画像はオリジナルの地域イラストであり、現地写真ではありません。

詳細：`docs/STATUS.md`、調査・編集判断：`docs/RESEARCH.md`、公開・運用：`docs/OPERATIONS.md`。

## ローカル起動

Node.js 22以降を推奨。

```sh
npm run materialize
npm ci
cp .env.example .env.local
npm run dev
```

localhost:3000で確認。秘密情報はコミットしないでください。

```sh
npm run build
npm run typecheck
npx playwright install chromium
npm test
```

テストはlocalhostのAPIモックへ接続し、架空の `.test` メールアドレスだけを使用します。実サービスへの保存・メール送信テストではありません。

## 構成

- `app/`：地域・記事・スタイル・フォーム・SEO・サーバーAPI
- `content/catalog.json`：記事の地域、タイトル、タグ、著者、出典、関連記事
- `content/articles/`：本文Markdown。信頼できる編集者の原稿のみ。
- `lib/affiliate.ts`：宿検索プロバイダー。Booking IDなしでは通常リンク。
- `lib/services.ts`：サーバー専用の保存・通知・CRM連携
- `supabase/schema.sql`：専用新規プロジェクト用DDL。実環境への適用は未実施。
- `tests/`：表示・動線・SEO・フォーム契約テスト
- `public/images/`：差し替え可能な地域イラスト／OG画像
- `public/fonts/`：OFLのNoto日本語フォント。現行原稿の文字でサブセット化。

## 記事を追加する

カタログに一意のslugと地域を追加し、同名Markdownを作成します。地域は `lib/content.ts` の定義へ追加。タグ、関連記事、出典日、所要時間、交通条件を見直し、ビルド・該当動線を確認します。現在は3地域での検証を優先し、全国の薄いページを量産しません。

新しい文字を大量追加した場合は、日本語フォントのサブセットを更新してください。未収録字形は端末の日本語フォントへフォールバックします。写真への差し替え時は権利・撮影場所・人物等の公開可否を確認し、altとイラスト表記を更新します。

## 編集上の仮定

公式情報を中心に構成し、確認できる一次体験のみEditor / たけとして明示。提案ルートは実際に走ったルートではありません。Atlas原本の私生活・第三者情報は含めません。70/30の比率より正確さを優先し、現在は調査情報の比率が高めです。料金や時刻は2026年10月時点の確認値で、出発前の再確認を案内します。

運営者メール、独自ドメイン、アフィリエイトID、GA4 IDは推測で設定しません。Vercel Hobbyは非商用限定のため、収益目的の公開には適切なプラン確認が必要です。新規課金は承認前に行いません。

## 2026-10-04 公開範囲の変更

本人の指示により現時点は非商用の旅行情報サイト試作とし、Hobbyの無料枠で公開準備を進めます。AFFILIATE_ENABLED=falseで収益化を明示的に無効化。広告や有料サービス募集を行いません。Bookingは普通の宿検索リンクです。将来の収益目的運用に切り替える前に、Vercelの商用条件とプランを再確認します。GitHubリポジトリ：https://github.com/take290/tabikurashi-johokyoku

## 暫定的なGitHub保存方式

GitHub接続の書き込みが403になったため、Webアップロードでソースを保存しています。`source-bundle.json`に元のファイルパスとUTF-8本文（画像・フォントはBase64）を保持し、`materialize.cjs`が元のNext.jsフォルダ構造を復元します。秘密情報は含みません。`npm run dev` / `npm run build`は復元を自動実行します。既存の編集済みファイルは上書きしません。

開発は`npm run materialize`→通常どおりMarkdown / TSXを編集→`npm run pack`→ソース束をコミット。追加ファイルは束にパスを登録してください。書き込み接続が直り次第、復元済みフォルダを通常のGit構成へ移行してください。

現在は非商用の情報提供試作です。アフィリエイトと広告は無効。商用化する前にVercelプランと利用条件を見直します。

## 公開検証（2026-10-04）

Vercel本番Ready、GitHubコミット5867e83。公開ブラウザでトップ・3地域・3看板記事・記事一覧・問い合わせ・404を確認。サイト由来のコンソールエラーなし（ブラウザ拡張のメタデータ送信エラーは除外）。CTAはBooking検索を別タブで開き、アフィリエイトIDなし。全ページのHTTP / canonical / JSON-LD / sitemap / robotsは `docs/LIVE-QA.json` に検証結果を保存済み（26ページ、13種類のCTA、sitemap 26件、robots、404すべて合格）。スマホ390×844はローカル検証済み、公開ブラウザのモバイル幅検証は未完了。

未完了：Supabase作成・実保存、Attio API資格情報と実接続、Resend送信ドメインとメールテスト、GSC登録・GA4。問い合わせは受付停止。元の全完成条件にはまだ達していません。
