import Header from "@/components/Header";

const SARAH_HEADSHOT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB5zCOXn6D7rBtTI-9UW2xmEmVChGCxX4aWTyUa5cRQVQ7D5M0j67798Y_ci27iL16IjJwrYU3GNcC6_XLPowz_IcVd76t1p33UNEMnsqOjvcy7zFG9_QlYRIrqyD4_nIwRcoR-zZF8U4Gw4JpNi-35YwrRdjVETnhK_AIUb-x0jDRa21ajMr7xWNrFofWWiksWYGP7WWReA0kw9r2Pl4yMxvRqBYGwWWi9XkC16D9RylxRbICt82UjLGlMcARyAZUb6MmInwtsgZrS";

const OFFICE_PHOTO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDkP0QuY8V-0ydNbgkTkLS9dRlQRGX6KDyCVOCQJxv9o7WqbXN9XPST_-KyVJcPqaY623VRNGV-QaEJEd3FdJCLr5i5I1USLomWQ6VM8r8F_i0foCAnD6GKMy-7gcK9DfmTevyIoGdvRBm0cPKRUjeGaq-hwrjIfcuKAQRseNw0HdQEIJnSWs8Zn4tBliq6wg-ve_sZkv5WMXDlou5ZP_0_gGk8IGMehwDy6qa3ixt1tXJ-aQAmWpKXIulGYrQXZmMEsxjFCn_11Gy1";

const GALLERY_OFFICE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCvZPdjcF3_t1V1eVKkzILa21zSarh6edyB-CDQ2IasvqiKZYQkQg6XNm_TrnTZ4l3PeHGQI97VZUalMiUkgJsYzpRqihYdWmRrtKPgUCcTgLXvpeEBa8PiOFbAt5rbHijgrpNK52udLzRxNYsiASu_7kVtmph05g6leu6Dre2SKqqLauDFpYQpGAxNAUDTGbxf08L2gUc73DIcboXnppTKcH9iW8n2TcAa1srXyb4TiVTm555mD-pkvKu5H8YUy4ItHBp7jg95FjHg";

const GALLERY_BRAINSTORM =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB1RfcH-yIVBfTRUq1Y4Tq9bXWSSoDxAlIxB4yTIB-9koxnqi6ARF8CBu7TMNUV6Ba7Sm6UvUZxpfq3C23YWThOr79048WZLh75tXaq9KqQgeCqoTQ6jQMEzhDZYvi2gyqIPwZdNMUAebMqV918U1Rd3ZDlvpUWnvYDcRbowC57uNeUrJ_nnQgUWC0a52Y6tetH8c-niNo7PcapkIOlXMJZENE8RFINvlRvhdZjjj8b36_fluvlMq_hctftt4UOhfEoqXjMhVfRQ3e_";

const GALLERY_EVENT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD0UptfG9gdk41sZZNzzeDcHpVIWtP15qjUm7IBusydF9NIL4f_3O0UsTWnJb5D2Us1HYPthw7JsEWRy20Nlo4AgdGn1DuNiosoGwJoGqByJACH0PldZ3xVTPLYZjIzRSMYoTf4wDr8En6ZoqxR5BEd3jXQ7tQ1sLjkCda-j-n3AWqVdz_wlW4AcPhzqOEx4XIvp1eS9njsaWGXbf3TEKOSGtPwX76M-mmZOwd2NRhdXOxDWnor83OdPhCSMT81bpguaXcM3YBg9jHc";

const roleDetails = [
  { icon: "work", label: "Department", value: "Product Engineering" },
  { icon: "schedule", label: "Experience", value: "Senior Level" },
  { icon: "group", label: "Team Size", value: "12 People" },
  { icon: "laptop_mac", label: "Work Policy", value: "Remote First" },
];

export default function ProfilePage() {
  return (
    <div className="bg-background-light min-h-screen text-text-primary-light">
      <Header />

      <div className="flex justify-center py-8">
        <div className="flex flex-col max-w-[640px] w-full px-4">

          {/* Profile header card */}
          <div className="flex flex-col items-center bg-surface-light rounded-xl shadow-sm p-6 mb-8 relative group">
            <button className="absolute top-4 right-4 p-2 text-text-secondary-light hover:text-primary transition-colors rounded-full hover:bg-background-light">
              <span className="material-symbols-outlined">edit</span>
            </button>

            <div className="flex flex-col items-center gap-4 w-full">
              {/* Avatar with company badge */}
              <div className="relative">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 ring-4 ring-background-light shadow-md"
                  style={{ backgroundImage: `url("${SARAH_HEADSHOT}")` }}
                  aria-label="Sarah Jenkins headshot"
                />
                <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-100">
                  <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-[8px] font-bold text-text-primary-light">
                    TF
                  </div>
                </div>
              </div>

              {/* Name and title */}
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-center flex items-center gap-2">
                  Sarah Jenkins
                  <span
                    className="material-symbols-outlined text-blue-500 text-xl"
                    title="Verified Recruiter"
                  >
                    verified
                  </span>
                </h1>
                <p className="text-text-secondary-light text-base font-medium mt-1 text-center">
                  Talent Acquisition Lead at TechFlow
                </p>
                <div className="flex items-center gap-1 mt-1 text-text-secondary-light text-sm">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span>San Francisco, CA</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex w-full gap-3 mt-4">
                {[
                  { value: "98%", label: "Response Rate" },
                  { value: "2d", label: "Avg Reply" },
                  { value: "Active", label: "Status" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex-1 bg-background-light rounded-lg p-3 flex flex-col items-center justify-center"
                  >
                    <span className="text-xl font-bold">{stat.value}</span>
                    <span className="text-xs text-text-secondary-light font-medium uppercase tracking-wider text-center">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full mt-6 pt-6 border-t border-gray-100 flex justify-center">
              <button className="flex w-full sm:w-auto min-w-[200px] cursor-pointer items-center justify-center gap-2 rounded-full h-10 px-6 bg-gray-100 text-text-primary-light text-sm font-bold hover:bg-gray-200 transition-colors">
                <span className="material-symbols-outlined text-lg">visibility</span>
                Preview Public Profile
              </button>
            </div>
          </div>

          {/* Section header */}
          <div className="flex flex-col gap-6">
            <div className="px-2 pb-2">
              <h2 className="tracking-tight text-xl font-bold leading-tight">My Profile</h2>
              <p className="text-text-secondary-light text-sm">
                Manage your prompts and showcase your company culture.
              </p>
            </div>

            {/* Tile 1: Photo quote — "Why I love TechFlow" */}
            <div className="bg-surface-light rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div
                className="relative h-[320px] w-full bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.8) 100%), url("${OFFICE_PHOTO}")`,
                }}
              >
                <button className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-sm text-text-primary-light transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                  <span className="material-symbols-outlined text-xl">edit</span>
                </button>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="bg-primary/90 backdrop-blur-sm inline-block px-3 py-1 rounded-full mb-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-text-primary-light">
                      Why I love TechFlow
                    </p>
                  </div>
                  <p className="text-white text-xl sm:text-2xl font-bold leading-snug drop-shadow-md">
                    &ldquo;The autonomy is real. We don&apos;t just talk about innovation; we ship it
                    every Friday.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Tile 2: About the Role */}
            <div className="bg-surface-light rounded-xl p-6 shadow-sm hover:border-primary/20 transition-all relative group border border-transparent">
              <button className="absolute top-4 right-4 text-text-secondary-light hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">info</span>
                About the Role
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roleDetails.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-center gap-3 p-3 rounded-lg bg-background-light"
                  >
                    <span className="material-symbols-outlined text-text-secondary-light">
                      {detail.icon}
                    </span>
                    <div>
                      <p className="text-xs text-text-secondary-light uppercase font-bold">
                        {detail.label}
                      </p>
                      <p className="text-sm font-semibold">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tile 3: "What I look for" prompt */}
            <div className="bg-surface-light rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="relative min-h-[280px] p-8 flex flex-col justify-center items-start bg-primary/10">
                <button className="absolute top-4 right-4 text-text-secondary-light hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <div className="mb-4">
                  <p className="text-sm font-bold text-text-secondary-light uppercase tracking-wider mb-2">
                    What I look for in a teammate
                  </p>
                  <div className="h-1 w-12 bg-primary rounded-full" />
                </div>
                <p className="text-text-primary-light text-2xl font-serif italic leading-relaxed">
                  &ldquo;Someone who isn&apos;t afraid to ask &lsquo;why?&rsquo; even when things are
                  working. Curiosity is our fuel.&rdquo;
                </p>
                <div className="mt-8 flex gap-2 flex-wrap">
                  {["#Curiosity", "#Resilience", "#Collaboration"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white border border-primary/20 text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tile 4: Photo gallery */}
            <div className="bg-surface-light rounded-xl p-6 shadow-sm relative group">
              <button className="absolute top-4 right-4 text-text-secondary-light hover:text-primary transition-colors z-10 opacity-0 group-hover:opacity-100">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <h3 className="text-lg font-bold mb-4">Office Vibes</h3>
              <div className="grid grid-cols-2 gap-2 h-64">
                <div
                  className="h-full rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url("${GALLERY_OFFICE}")` }}
                  aria-label="Modern office interior"
                />
                <div className="grid grid-rows-2 gap-2 h-full">
                  <div
                    className="h-full rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url("${GALLERY_BRAINSTORM}")` }}
                    aria-label="Team brainstorming session"
                  />
                  <div
                    className="h-full rounded-lg bg-cover bg-center relative overflow-hidden group/image"
                    style={{ backgroundImage: `url("${GALLERY_EVENT}")` }}
                    aria-label="Company social event"
                  >
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-white text-xs font-bold">+3 more</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tile 5: Voice prompt */}
            <div className="bg-surface-light rounded-xl p-6 shadow-sm flex flex-col gap-4 relative group">
              <button className="absolute top-4 right-4 text-text-secondary-light hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <p className="text-sm font-bold text-text-secondary-light uppercase tracking-wider">
                My work style in one word
              </p>
              <div className="flex items-center gap-4">
                <button className="size-14 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors shrink-0">
                  <span className="material-symbols-outlined text-3xl filled">play_arrow</span>
                </button>
                {/* Static waveform */}
                <div className="flex-1 flex items-center gap-0.5 h-10">
                  {[3, 6, 4, 8, 5, 9, 6, 4, 7, 5, 8, 3, 6, 9, 5, 7, 4, 8, 6, 3, 9, 5, 7, 4, 6].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-full bg-primary/40"
                        style={{ height: `${h * 10}%` }}
                      />
                    )
                  )}
                </div>
                <span className="text-xs text-text-secondary-light font-medium shrink-0">0:12</span>
              </div>
            </div>

            {/* Add a prompt CTA */}
            <button className="w-full flex items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/5 text-text-secondary-light hover:text-primary transition-all group">
              <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">
                add_circle
              </span>
              <span className="text-base font-semibold">Add a prompt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
