"use client";
import PopulateSiderbarLinks from "@/components/PopulateSidebarLinks";
import { DashboardContext } from "@/contexts/DashboardProvider";
import translate from "@/hooks/translate";
import debounce from "@/lib/debounce";
import { hasLinksToRender, isSuperiorOrEqual, sanitizeRole } from "@/roles";
import { sidebarLinks } from "@/routes";
import gsap from "gsap";
import { RefObject, useContext, useEffect, useRef, useState } from "react";

type SidebarProps = {
  triggerRef: RefObject<HTMLDivElement>;
};

export default function Sidebar({ triggerRef }: SidebarProps) {
  const t = translate();
  const { locale } = useContext(DashboardContext);
  const { session } = useContext(DashboardContext);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const closeTriggerRef = useRef<HTMLDivElement>(null);
  const sidebarContainerRef = useRef<HTMLDivElement>(null);
  const [windowResized, setWindowResized] = useState<number>(0);

  useEffect(
    function () {
      if (
        !sidebarRef.current ||
        !sidebarContainerRef.current ||
        !triggerRef.current ||
        !closeTriggerRef.current
      ) {
        return;
      }

      const doNotAnimate = window.innerWidth >= 1024;
      if (doNotAnimate) {
        sidebarRef.current.removeAttribute("style");
        return;
      }

      // Setting the animation duration
      const duration = 0.3;
      const timeline = gsap.timeline({ defaults: { duration } }).pause();

      timeline
        .addLabel("start")
        .fromTo(
          sidebarRef.current!,
          {
            left: "-100%",
          },
          { left: 0 },
          "start",
        )
        .fromTo(
          closeTriggerRef.current,
          { opacity: 0 },
          { opacity: 0.4 },
          "start",
        );

      triggerRef.current.addEventListener("click", () => {
        sidebarContainerRef.current?.classList.remove("-left-full");
        timeline.play();
      });

      closeTriggerRef.current.addEventListener("click", () => {
        timeline.reverse();

        setTimeout(() => {
          sidebarContainerRef.current?.classList.add("-left-full");
        }, duration * 1000);
      });

      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          timeline.reverse();
        }
      });
    },
    [
      windowResized,
      sidebarRef,
      sidebarContainerRef,
      triggerRef,
      closeTriggerRef,
    ],
  );

  useEffect(function () {
    window.addEventListener(
      "resize",
      debounce(() => {
        setWindowResized((windowResized) => windowResized + 1);
      }, 1),
    );
  }, []);

  return (
    <div
      ref={sidebarContainerRef}
      className="absolute -left-full z-10 grid h-full w-full grid-cols-1 grid-rows-1 lg:relative lg:left-0"
    >
      <div
        ref={sidebarRef}
        className="absolute z-50 grid h-full w-full max-w-[280px] grid-rows-[70px_1fr] bg-[var(--sidebar-background)] text-white lg:relative lg:left-0"
      >
        <div></div>
        <div className="flex flex-col gap-4 px-4">
          {/* Admin Links */}
          <div>
            {isSuperiorOrEqual(sanitizeRole(session.user?.role), "admin") && (
              <div className="py-4 text-sm font-semibold uppercase">
                {t("Admin")}
              </div>
            )}
            <PopulateSiderbarLinks
              locale={locale}
              userRole={sanitizeRole(session.user?.role)}
              links={sidebarLinks.admin}
            />
          </div>

          {/* Agent Links */}
          <div>
            {isSuperiorOrEqual(sanitizeRole(session.user.role), "agent") &&
              hasLinksToRender(sanitizeRole(session.user.role), "agent") && (
                <div className="py-4 text-sm font-semibold uppercase">
                  {t("Agent")}
                </div>
              )}
            <PopulateSiderbarLinks
              locale={locale}
              userRole={sanitizeRole(session.user.role)}
              links={sidebarLinks.agent}
            />
          </div>

          {/* Staff Links */}

          {/* Customer Links */}
          <div>
            {isSuperiorOrEqual(sanitizeRole(session.user.role), "customer") &&
              hasLinksToRender(sanitizeRole(session.user.role), "customer") && (
                <div className="py-4 text-sm font-semibold uppercase">
                  {t("Customer")}
                </div>
              )}
            <PopulateSiderbarLinks
              locale={locale}
              userRole={sanitizeRole(session.user.role)}
              links={sidebarLinks.customer}
            />
          </div>
        </div>
      </div>
      <div className="w-screen bg-black" ref={closeTriggerRef}></div>
    </div>
  );
}
