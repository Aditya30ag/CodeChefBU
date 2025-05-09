"use client";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/ui/resizable-navbar";
import { useState } from "react";
import { GridBackgroundDemo } from "./GridBackgroundDemo";

export function NavbarDemo() {
    const navItems = [
        {
            name: "About",
            link: "#about",
        },
        {
            name: "Events",
            link: "#events",
        },
        {
            name: "Team",
            link: "#team",
        },
    ];

    const scrollToSection = (id) => {
        console.log(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
    
            // Add 100px offset after smooth scroll
            window.scrollBy(0, 100); // This will scroll 100px up after scrolling to the section
        }
    };
    
    const handleLinkClick = (id) => {
        scrollToSection(id);
    }

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="relative w-full">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        <NavbarButton variant="secondary">Contests</NavbarButton>
                        <NavbarButton variant="primary">Join Us</NavbarButton>
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                    </MobileNavHeader>

                    <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => { setIsMobileMenuOpen(false); handleLinkClick(item.link.substring(1)); }}
                                className="relative text-neutral-600 dark:text-neutral-300">
                                <span className="block">{item.name}</span>
                            </a>
                        ))}
                        <div className="flex w-full flex-col gap-4">
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="primary"
                                className="w-full">
                                Contests
                            </NavbarButton>
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="primary"
                                className="w-full">
                                Join Us
                            </NavbarButton>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
            <DummyContent />
            {/* Navbar */}
        </div>
    );
}

const DummyContent = () => {
    return (
        <div className="container pt-24">
            <div className="min-h-screen min-w-screen z-40">
                <GridBackgroundDemo/>
            </div>
        </div>
    );
};
