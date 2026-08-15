# Interview Workflow

Treat this interview as an adaptive state machine for the fields that are visibly rendered by the locked site. Complete one stage before requesting the next category of material. Each stage follows the same cycle:

1. Request one material category or one project.
2. Inspect every received item with the format-appropriate reader.
3. Report a short inventory with `parsed`, `partially parsed`, `received only`, or `unreadable` status.
4. Ask no more than three questions about unresolved visible fields in that stage.
5. Record the answers, state what is resolved, and move to the next stage.

Never open with an all-material upload request. Never show the full questionnaire at once. If the user uploads future-stage files early, inventory and preserve them, then continue from the current stage; do not request those files again. Do not ask about purpose, audience, page scope, visual references, reference websites, stylistic lanes, or motion intensity. The site topology, visual language, proportions, and motion are fixed.

Keep state-machine language internal. Never expose stage names or narrate where the agent is working. Do not say `处理屏首`, `处理 About`, `进入下一阶段`, `这一轮`, `下一步`, `模块`, or `部分`. User-facing prompts should contain only a direct request for material, a short explanation of any transformation the user must approve, and necessary choices.

## Stage 0: Existing personal material

The first skill response asks only:

> 请上传或粘贴你现有的个人资料，例如简历、个人简介、旧作品集文件，或者直接写下姓名和职业。没有现成资料也可以直接回复“没有”。

After material arrives, inspect it and report which visible fields were parsed: Chinese/English display name, role, short support line, public location, public email, biography source, and resume file. Never infer claims from filenames. Ask only for missing visible fields; do not run a strategic interview.

## Stage 1: Display identity and language

Use parsed facts before asking. Request missing display-name or role text only when the basic material did not contain it.

Ask only unresolved items:

1. Hero name and role language source: `我提供双语` `我只给中文，你翻译英文` `我只给英文，你翻译中文` `使用简历内容整理` `其他`.
2. Default locale: `中文` `English` `follow browser`.
3. Translation tone: `忠实直译` `中文自然改写` `英文国际化改写` `各自母语化`.

Never fabricate employment, clients, metrics, awards, or credentials. Mark unresolved claims.

## Stage 2: Hero material

First ask:

> 请上传一张本人照片、一个本人出镜的视频，或者一张希望转绘成动漫风格的本人照片。素材不必提前裁成横屏，我会根据网站比例整理；暂时没有也可以回复“没有”。

After inspecting the upload, ask:

1. Medium: `横屏图片（推荐）` `横屏视频` `你判断` `暂不提供`.
2. Style: `保留真人摄影` `平面动漫` `立体动漫` `从文字描述生成` `其他`.
3. Focal point: `偏右，左侧留字` `居中` `偏左，右侧留字` `你判断`.

Require 16:9. For identity-preserving conversion, obtain a clear source photo and keep identity, face, hair, age cues, and expression invariant. For video, require MP4 or WebM plus a matching poster image; default to autoplay, muted, loop, playsInline, and hidden controls.

If hero media is deferred, record `hero asset deferred` and continue. The brief may be approved, but production delivery remains blocked until real 16:9 media replaces the placeholder.

## Stage 3: Primary work, one project at a time

Start with:

> 请上传你的第一件代表作品，可以发送图片、视频、项目说明、过程文档或文件夹。传完后回复“这一件传完了”。

For each project:

1. Inspect and inventory only that project's files.
2. Extract title, year, role/category, one-sentence outcome, media type, and evidence strength.
3. Ask at most three missing project questions. Offer `使用文件里的信息` `我补充` `你整理后让我确认` `不公开这个信息`.
4. Ask one gate question: `继续上传下一件` `主作品传完了` `这件不要了`.

Repeat without reprinting earlier questions. Accept 1-8 projects. For 9 or more, recommend the strongest 6-8 based on evidence quality, completeness, and visual variety. Every project may use image or video media. Ask about video controls only when that project includes video.

## Stage 4: Lab or secondary work

After primary work is closed, ask:

> 是否还有小项目、实验作品、独立 App 或练习想放进深色 Lab 区？请选择：`有，逐个上传` `从刚才作品中挑选` `没有，隐藏 Lab` `你判断`。

If uploading, use the same one-project-at-a-time loop as Stage 3. Do not batch-request every Lab item.

## Stage 5: About text

First ask:

> 请粘贴或上传一段个人介绍。内容再长也可以，我会整理成约 3-5 行的中英文短介绍并请你确认；也可以回复“根据已有资料整理”。

After inspection:

1. Draft one English statement of roughly 24-40 words and one Chinese statement of roughly 45-75 Chinese characters. These are fit targets, not quotas; visual line count at the approved desktop baseline is authoritative.
2. Preserve identity, core disciplines, and one point of view. Remove timelines, repeated claims, project lists, education detail, and generic self-praise.
3. Show the compressed bilingual statement and ask for approval or a specific correction.

Ask only when unresolved:

1. Source: `我直接写` `根据资料整理后让我确认` `使用上传的现成文字`.
2. Tone: `专业克制` `自然个人化` `简短直接` `其他`.

Do not collect interests/tags, a second About paragraph, or detailed About-page content. Do not add a `More about me` action or About detail page.

## Stage 6: Resume and contact

Ask directly:

> 请上传希望访客下载的简历 PDF，并提供愿意公开的邮箱、所在地和社交主页。已经上传过的简历不用重复发送；不希望公开的项目可以回复“隐藏”。

Do not reuse private data without confirmation.

Ask:

1. Resume: `上传一份共用PDF` `上传中英文两份PDF` `使用Stage 0简历` `暂时隐藏入口`.
2. Public contact: `邮箱` `社交主页` `邮箱+社交主页` `隐藏非必要项`.
3. Public location: `显示城市` `显示国家/地区` `隐藏` `其他`.

Never expose private phone numbers, addresses, IDs, or document metadata without explicit confirmation. In About, render only the `Download resume` button when a resume exists. Never render `More about me` or link to another page.

## Stage 7: Palette

Show the five bundled choices from `assets/palettes.json` as compact color swatches with bilingual names:

1. `release-tide` / 舒展潮汐: `#E0F0F8` `#FFF9B1` `#C0E890`
2. `mediterranean-dawn` / 地中海晨光: `#C5E0E8` `#FFD1D1` `#A8E6A3`
3. `imperfect-vitality` / 不完美生命力: `#F5E8DA` `#C4DFAA` `#FF8C69`
4. `free-sail` / 自由轻盈: `#F7F7F7` `#FFC9C9` `#FFF9B1`
5. `lazy-liberty` / 自在松弛: `#E8CEC8` `#C8B8D9` `#9CD9C9`

Ask:

1. Palette: one of the five choices, `我提供自定义色卡/色值`, or `你根据内容选择`.
2. Default theme: `浅色` `深色` `跟随系统`.

Do not ask for a reference website or style. A custom color card may influence semantic colors only; never copy its layout, typography, gradients, blur, artwork, or decorative treatment.

## Stage 8: Build brief

Summarize exact section order, displayed identity, content count, hero asset plan, language strategy, compressed About statement, resume files or omission, palette, and omitted features. Include a material-driven Work/Lab layout decision: chosen composition family, featured items, spans, media crops, and why it fits the uploaded media. State that outer gutters remain locked while internal project composition may vary. Explicitly record `no More about me`, `no detail pages`, and `About has Download resume only`. Separate `implementation now`, `production blockers`, and `can be completed later`.

Ask one confirmation: `确认开始生成` `需要修改` `还要补资料`. Build only after confirmation and when no implementation blocker remains.

## Conversation rules

- Accept `有`, `没有`, `其他`, `你决定`, partial answers, and unplanned file formats.
- Ask at most three related questions per response, except the single project-loop gate.
- When the user says `你决定`, choose from the parsed material and fixed site contract, then record the decision.
- Ask only for missing visible content or the few supported behaviors. Do not ask questions whose answers cannot change a rendered field.
- After every upload, inspect first and acknowledge exactly what was parsed before asking questions.
- Do not request a later-stage material category before the current stage is resolved.
- Do not repeat completed questions or ask the user to re-upload preserved material.
- Continue from the first unresolved stage after interruptions.
