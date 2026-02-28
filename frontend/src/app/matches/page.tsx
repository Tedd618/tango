import Header from "@/components/Header";

const SARAH_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBxdvkO-iwyy-_iY-aBxDdW-N89xx3cmFXjGoL8t0ecKGjjsfm-R7wnSYk2We8gDDJhFRsiFFwk66atkx6BDqm4038Gfxzy3rFX_C59SeVKWqctd6jf3UbSIO1oVxJdb6s0QjJPpg5171MoSc10FxjiN7-THcVv-4yJCRNL3Gep0kjbuiXNFYsY0vLXNsT7GMeF7-UlDwurob-1hRyzpjs3HfXGe_i5pl3lF24uvtLXJrtLJuBiIstkoAPL2v9LGN_jxyw82RClkDuq";

const DAVID_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBML_Z1aT0vdCKDJ_wtZ479C_Zn3Bclr-ZE_wv3vfRihe6d7IXI7Pv1aqSUXByauLAIJ8dJIFQr6cP74DbbY-kK0GMt8gqXeqGPUKZp6QwJpXAwkt6wvP8ZjW9RyuuIU0QvUBH_G3vhet7TTSDPlT8e8SAIeHy4p3Z_pY6FCpHd8YwtFjGnro_7BIbXmXxhgdnWvTQh-FvGHOX9qmR2sZWhy2ysCZ1xN3LX7y-PMipMMvCg4TsMQcUWslAZ6mhPKIcmJ8GbbUQCkvBq";

const ELENA_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAhq6U09qlihqFAlOx5_HnSwR2jBhtf-6hQfN4Nwfu72tUqIqkTp0FLi-dGgtXJhhzKlY3F8AjutWWX-k74fNL_IXqxM6CViVtlq19VRyE49qYfOQy679eeQop5KH-z8cBf6Uu0AIgQRVF9kC-J85_mS-yVyNroQJY4KWphbPa2BWiStLZarvw1_lp-xVSre32IASe1rRqhOiDLGxzITW50UnUjsEXFpqZVTLfwv8MW5gWlGcd11DkLloI3gTxD87exJyQV1ONdkaKi";

const MARIA_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCuJqNs6Ls3gGwu2XCZjF0bviSTr4fmyhy1vpEITEn2e_MR6Q9gpMmJHdriGJg7m7pDMY_c7V7AbOVECLuHgjBMXNGqv0CbXvEsIJ6YTkASGdupLVdA1_WFgWpxEoSfITtYcd7-AUeA9CmiKaCVIeVkTT7Zl0I7fmevXze_tMmx9DjKvs61W1229bTkHK3lXeo_S0EjVs6yVJoD2Ezns4JZf4FfgPsVzSTZDVFGlLOjJhtg8jnJxo29-689htwgLyfdmYHaJ6k_e-V7";

const LIAM_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBhNH1UzZb7iQxz9N3-Y2aZ_aQAj6cRZ46E1piQVZyKGzL9jmfqCxnNChQ9dmX2LgkpaYE2EwYOMyEwf-Jg0EC3XUFPOZB8ViWH1lif_mgM075a6jKhwKoPq77JAk7lEgfG7K6qbVEkgR5UCGUv0BdrOhyQrAd6ejRzqy2AYV3tLaWKJW4sNG2NpCeuzJCTsMv-WiQTl7cGlZTznEQIU123aE01VCRB6uDiJ1CJFANqfeMKnlXDz_pJCbKwUyADE1low-JJ0EBtLLSJ";

const conversations = [
  {
    id: 1,
    name: "Sarah Jenkins",
    avatar: SARAH_AVATAR,
    time: "2m",
    message: "Thanks for reaching out! I'm available anytime this week for a quick call.",
    online: true,
    active: true,
  },
  {
    id: 2,
    name: "David Chen",
    avatar: DAVID_AVATAR,
    time: "1h",
    message: "Do you have a link to the JD?",
    online: false,
    active: false,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    avatar: ELENA_AVATAR,
    time: "1d",
    message: "Sounds great, looking forward to it!",
    online: false,
    active: false,
  },
];

export default function MatchesPage() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-light text-text-primary-light">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full md:w-[400px] flex flex-col border-r border-neutral-200 bg-surface-light z-10 shrink-0">
          <div className="px-6 pt-6 pb-2">
            <h3 className="tracking-tight text-3xl font-bold leading-tight mb-4">Matches</h3>

            {/* Search */}
            <label className="flex flex-col w-full h-12 mb-4 group">
              <div className="flex w-full flex-1 items-stretch rounded-xl bg-background-light border border-transparent group-focus-within:border-primary transition-all">
                <div className="text-text-secondary-light flex items-center justify-center pl-4 pr-2">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  className="flex w-full min-w-0 flex-1 bg-transparent text-text-primary-light focus:outline-none placeholder:text-text-secondary-light px-2 text-base font-normal leading-normal"
                  placeholder="Search applicants"
                />
              </div>
            </label>

            {/* New match avatars */}
            <div className="flex gap-4 overflow-x-auto pb-4">
              {/* Add to queue */}
              <div className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer">
                <div className="size-16 rounded-full border-2 border-dashed border-primary flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined">add</span>
                </div>
                <span className="text-xs font-medium text-text-secondary-light">Queue</span>
              </div>

              {/* Maria */}
              <div className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer group">
                <div className="relative">
                  <div
                    className="size-16 rounded-full bg-cover bg-center border-2 border-primary group-hover:scale-105 transition-transform duration-200"
                    style={{ backgroundImage: `url("${MARIA_AVATAR}")` }}
                    aria-label="Maria"
                  />
                  <div className="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-white" />
                </div>
                <span className="text-xs font-bold text-text-primary-light">Maria</span>
              </div>

              {/* Liam */}
              <div className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer group">
                <div className="relative">
                  <div
                    className="size-16 rounded-full bg-cover bg-center border-2 border-primary group-hover:scale-105 transition-transform duration-200"
                    style={{ backgroundImage: `url("${LIAM_AVATAR}")` }}
                    aria-label="Liam"
                  />
                </div>
                <span className="text-xs font-bold text-text-primary-light">Liam</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-neutral-200 w-full mb-2" />

          {/* Conversations list */}
          <div className="flex-1 overflow-y-auto px-2">
            <div className="text-xs font-bold text-text-secondary-light uppercase tracking-wider px-4 py-3">
              Messages
            </div>
            {conversations.map((convo) => (
              <div
                key={convo.id}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors border-l-4 ${
                  convo.active
                    ? "bg-primary/10 border-primary"
                    : "hover:bg-background-light border-transparent"
                }`}
              >
                <div className="relative shrink-0">
                  <div
                    className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14 ${
                      !convo.active ? "grayscale-[0.2]" : ""
                    }`}
                    style={{ backgroundImage: `url("${convo.avatar}")` }}
                    aria-label={convo.name}
                  />
                  {convo.online && (
                    <div className="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <p
                      className={`text-text-primary-light text-base leading-normal truncate ${
                        convo.active ? "font-bold" : "font-semibold"
                      }`}
                    >
                      {convo.name}
                    </p>
                    <p className="text-text-secondary-light text-xs font-medium shrink-0">
                      {convo.time}
                    </p>
                  </div>
                  <p
                    className={`text-sm leading-normal line-clamp-1 truncate ${
                      convo.active
                        ? "text-text-primary-light font-medium"
                        : "text-text-secondary-light font-normal"
                    }`}
                  >
                    {convo.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat window */}
        <main className="flex-1 flex flex-col bg-background-light">
          {/* Chat header */}
          <div className="flex items-center justify-between px-8 py-4 bg-surface-light border-b border-neutral-200 shadow-sm z-10">
            <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="relative">
                <div
                  className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12"
                  style={{ backgroundImage: `url("${SARAH_AVATAR}")` }}
                  aria-label="Sarah Jenkins"
                />
                <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-text-primary-light flex items-center gap-2">
                  Sarah Jenkins
                  <span className="inline-flex items-center rounded-md bg-primary/20 px-2 py-0.5 text-xs font-medium text-text-primary-light ring-1 ring-inset ring-primary/30">
                    Senior Product Designer
                  </span>
                </h2>
                <p className="text-sm text-text-secondary-light">Active now</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 text-text-secondary-light hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                title="View Profile"
              >
                <span className="material-symbols-outlined">person</span>
              </button>
              <button
                className="p-2 text-text-secondary-light hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                title="Video Call"
              >
                <span className="material-symbols-outlined">videocam</span>
              </button>
              <button
                className="p-2 text-text-secondary-light hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                title="More Options"
              >
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 bg-background-light">
            {/* Date separator */}
            <div className="flex justify-center">
              <span className="text-xs font-medium text-text-secondary-light bg-surface-light px-3 py-1 rounded-full shadow-sm">
                Today, 10:23 AM
              </span>
            </div>

            {/* Recruiter messages */}
            <div className="flex flex-col items-end gap-1 max-w-[80%] self-end">
              <div className="bg-primary text-text-primary-light px-5 py-3 rounded-2xl rounded-tr-sm shadow-sm text-base">
                <p>
                  Hi Sarah! I reviewed your portfolio and I&apos;m really impressed with your case
                  study on the fintech app.
                </p>
              </div>
              <span className="text-xs text-text-secondary-light pr-1">10:23 AM</span>
            </div>
            <div className="flex flex-col items-end gap-1 max-w-[80%] self-end">
              <div className="bg-primary text-text-primary-light px-5 py-3 rounded-2xl rounded-tr-sm shadow-sm text-base">
                <p>
                  Would you be open to a quick chat this week to discuss a Senior Product Designer
                  role we have open?
                </p>
              </div>
              <span className="text-xs text-text-secondary-light pr-1">10:24 AM</span>
            </div>

            {/* Applicant messages */}
            <div className="flex flex-col items-start gap-1 max-w-[80%] self-start">
              <div className="flex items-end gap-2">
                <div
                  className="bg-center bg-no-repeat bg-cover rounded-full h-8 w-8 shrink-0 mb-1"
                  style={{ backgroundImage: `url("${SARAH_AVATAR}")` }}
                  aria-label="Sarah Jenkins"
                />
                <div className="bg-surface-light border border-neutral-100 text-text-primary-light px-5 py-3 rounded-2xl rounded-tl-sm shadow-sm text-base">
                  <p>Hi! Thank you so much, I&apos;m glad you liked the case study.</p>
                </div>
              </div>
              <span className="text-xs text-text-secondary-light pl-11">10:30 AM</span>
            </div>
            <div className="flex flex-col items-start gap-1 max-w-[80%] self-start">
              <div className="flex items-end gap-2">
                <div className="w-8 shrink-0" />
                <div className="bg-surface-light border border-neutral-100 text-text-primary-light px-5 py-3 rounded-2xl rounded-tl-sm shadow-sm text-base">
                  <p>
                    Thanks for reaching out! I&apos;m available anytime this week for a quick call.
                    Does Thursday afternoon work for you?
                  </p>
                </div>
              </div>
              <div className="flex gap-2 pl-11 mt-1">
                <button className="text-xs font-semibold text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
                  Book a meeting
                </button>
                <button className="text-xs font-semibold text-text-secondary-light border border-neutral-200 hover:bg-neutral-100 px-3 py-1.5 rounded-lg transition-colors">
                  View Resume
                </button>
              </div>
              <span className="text-xs text-text-secondary-light pl-11">10:31 AM</span>
            </div>
          </div>

          {/* Input area */}
          <div className="bg-surface-light px-8 py-5 border-t border-neutral-200 z-10">
            <div className="flex items-end gap-4 max-w-5xl mx-auto">
              <button
                className="p-3 text-text-secondary-light hover:text-primary bg-background-light rounded-full transition-colors shrink-0"
                title="Attach file"
              >
                <span className="material-symbols-outlined">attach_file</span>
              </button>
              <div className="flex-1 bg-background-light rounded-2xl p-3 flex flex-col border border-transparent focus-within:border-primary/50 transition-colors">
                <textarea
                  className="w-full bg-transparent border-none focus:ring-0 resize-none text-text-primary-light placeholder:text-text-secondary-light max-h-32 min-h-[24px] focus:outline-none"
                  placeholder="Type a message..."
                  rows={1}
                />
              </div>
              <button
                className="p-3 bg-primary hover:bg-primary-dark text-text-primary-light rounded-full shadow-md transition-all hover:scale-105 shrink-0 flex items-center justify-center"
                title="Send message"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            <div className="max-w-5xl mx-auto mt-2 flex justify-end">
              <p className="text-xs text-text-secondary-light">
                Press{" "}
                <kbd className="font-sans px-1 py-0.5 rounded bg-neutral-100 border border-neutral-200">
                  Enter
                </kbd>{" "}
                to send
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
