const text = {
  ko: {
    badge: "ABOUT FREETV",
    title: "모두를 위한 열린 클래식 콘텐츠 라이브러리",
    desc: "FREETV는 누구나 자유롭게 감상할 수 있는 퍼블릭 도메인 영화를 쉽고 아름답게 탐색할 수 있도록 만든 오픈 시네마 라이브러리입니다.",
    sections: [
      {
        title: "What is FREETV?",
        body: "FREETV는 저작권 보호 기간이 만료되었거나 자유롭게 공개된 콘텐츠를 한곳에서 소개하는 아카이브형 웹사이트입니다. 현재는 퍼블릭 도메인 영화를 중심으로 시작하며, 이후 음악, 미술, 도서 콘텐츠까지 확장할 예정입니다.",
      },
      {
        title: "What is Public Domain?",
        body: "퍼블릭 도메인은 저작권 제한 없이 누구나 자유롭게 이용할 수 있는 콘텐츠를 의미합니다. 오래된 고전 영화, 문학 작품, 예술 작품 중 일부는 퍼블릭 도메인으로 공개되어 교육, 감상, 연구 목적으로 활용할 수 있습니다.",
      },
      {
        title: "Our Mission",
        body: "FREETV의 목표는 고전 콘텐츠를 어렵고 낡은 자료처럼 보이게 하는 것이 아니라, 현대적인 디자인과 쉬운 설명을 통해 누구나 편하게 접근할 수 있는 문화 라이브러리로 만드는 것입니다.",
      },
      {
        title: "Future Library",
        body: "FREETV는 Movies를 시작으로 Music, Art, Books 영역까지 확장할 계획입니다. 장기적으로는 여러 언어를 지원하여 한국어와 영어 사용자 모두가 자유 콘텐츠를 쉽게 탐색할 수 있는 플랫폼을 목표로 합니다.",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="bg-gradient-to-b from-sky-100 to-white px-6 py-24 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
          {text.ko.badge}
        </p>

        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
          {text.ko.title}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          {text.ko.desc}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {text.ko.sections.map((section) => (
            <div
              key={section.title}
              className="rounded-3xl bg-sky-50 p-8 ring-1 ring-sky-100"
            >
              <h2 className="text-2xl font-bold text-slate-950">
                {section.title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-20">
  <div className="rounded-[2rem] bg-gradient-to-br from-sky-500 to-sky-400 px-8 py-12 text-center text-white shadow-lg">
    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-100">
      READY TO EXPLORE?
    </p>

    <h2 className="mt-4 text-3xl font-bold md:text-5xl">
      고전 영화의 세계를 지금 바로 탐험해보세요.
    </h2>

    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-sky-50">
      FREETV에서 퍼블릭 도메인 영화와 고전 콘텐츠 이야기를 쉽고 편하게 만나볼 수 있습니다.
    </p>

    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <a
        href="/movies"
        className="rounded-full bg-white px-6 py-3 text-sm font-bold text-sky-600 transition hover:bg-sky-50"
      >
        Browse Movies
      </a>

      <a
        href="/blog"
        className="rounded-full bg-sky-600 px-6 py-3 text-sm font-bold text-white ring-1 ring-sky-200 transition hover:bg-sky-700"
      >
        Read Articles
      </a>
    </div>
  </div>
</section>
    </main>
  );
}