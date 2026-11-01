# CLAUDE.md --- Interactive Wedding Invitation

## Mission

Act as a senior creative frontend engineer, interaction designer, and
motion designer. Build an exceptional, mobile-first digital wedding
invitation for the couple.

This should not look like a generic wedding template. It should feel
like a personal, romantic, cinematic experience: a little digital
storybook filled with meaningful details, playful discoveries, beautiful
transitions, and subtle Easter eggs.

The invitation must still be practical. Guests should be able to find
the couple's names, wedding date, venue, schedule, dress code (if
provided), contact details, and RSVP information quickly.

## 1. Start by understanding the project

Before writing code:

1.  Inspect the repository structure, framework, package manager,
    scripts, existing components, styling system, and installed
    dependencies.
2.  Read any existing project documentation and follow established
    conventions.
3.  Identify available images, illustrations, fonts, logos, and other
    assets. Reuse suitable assets rather than creating unnecessary
    replacements.
4.  Do not replace the existing stack or rewrite working parts without a
    clear reason.
5.  If the repository is empty, choose a sensible lightweight frontend
    setup and explain the choice briefly.
6.  Do not invent wedding facts. Use clearly marked editable
    placeholders for missing information.

## 2. Design direction

Create a distinctive visual identity before implementing the page.

Suggested direction: - Romantic, editorial, intimate, elegant, and
slightly whimsical. - A warm palette: ivory, parchment, muted blush,
champagne, sage, and deep brown/ink. Adjust if the couple's preferences
or supplied assets suggest another direction. - Expressive typography: a
beautiful display serif for names and headings, paired with a highly
readable body font. - Fine paper textures, delicate borders, botanical
details, hand-drawn accents, subtle grain, and tasteful ornamental
dividers. - A strong visual hierarchy with generous whitespace. - A
cohesive visual language across every section and interaction.

Avoid: - Generic template layouts. - Excessive pink, glitter, hearts, or
ornamental clutter. - Too many competing fonts, gradients, shadows, or
animation styles. - Tiny text, low contrast, and interactions that make
essential details hard to find.

The result should feel custom-designed, not assembled from unrelated UI
components.

## 3. Experience and page structure

Build a complete invitation experience. Adapt the exact sections to the
supplied wedding information, but consider this flow:

1.  **Opening / envelope**
    -   A beautiful closed-envelope or invitation-cover screen.
    -   A clear interaction such as "Open invitation".
    -   Animate the envelope, seal, paper, or cover opening.
    -   Provide a reduced-motion and no-animation-friendly path.
2.  **Hero**
    -   Couple's names as the main visual focus.
    -   Wedding date and a short personal line.
    -   A subtle animated visual motif.
3.  **Our story**
    -   A short timeline or a few illustrated story moments.
    -   Keep the writing personal and concise; do not invent
        relationship milestones.
4.  **Wedding details**
    -   Ceremony and reception details, date, time, venue, and address.
    -   A map/directions link when a real venue address is provided.
    -   Make these details easy to scan.
5.  **Schedule**
    -   A simple event timeline with times and descriptions, only when
        supplied.
6.  **Gallery / memories**
    -   Use supplied couple photographs where available.
    -   Make image presentation responsive and accessible.
7.  **RSVP**
    -   A clear RSVP action or form if the project has a real submission
        destination.
    -   Never pretend an RSVP was submitted if no backend or service is
        connected.
    -   If no destination is provided, use a clearly labelled
        placeholder and document what must be connected.
8.  **Closing**
    -   A warm thank-you message and a final visual flourish.

Do not force every section into the design if it makes the experience
longer or less coherent. Prioritize the couple's story and the guest's
needs.

## 4. Easter eggs and delightful interactions

Add multiple meaningful Easter eggs throughout the experience. They
should reward curiosity without obstructing the invitation.

Possible ideas: - Clicking a tiny star, flower, illustration, monogram,
or decorative stamp reveals a hidden note. - A secret message appears
after clicking the couple's initials in a particular sequence. - A small
constellation or botanical illustration reacts to pointer movement. - A
hidden "little love note" appears when a guest taps a subtle decorative
detail. - A tiny animation or alternate illustration appears after
scrolling through the story. - A playful surprise appears when the guest
reaches the bottom of the invitation. - A keyboard-accessible secret
interaction for desktop users. - A subtle celebration animation after
opening the invitation or completing an RSVP action.

Implementation rules: - Aim for around 5--8 Easter eggs, but prioritize
quality over quantity. - Make them feel connected to the couple, their
story, or shared interests. - Do not hide essential wedding information
inside Easter eggs. - Do not make any Easter egg necessary to complete
the invitation or RSVP. - Ensure hidden interactions are keyboard
accessible and have accessible labels. - Avoid annoying popups, flashing
effects, loud sounds, or forced interactions. - If a surprise includes
sound, keep it off by default and provide an obvious user-controlled
toggle. - Keep a short developer note describing where each Easter egg
is located and how to trigger it.

If personal details are not yet available, implement tasteful
placeholder Easter eggs and make their text/content easy to customize.

## 5. Animation and motion direction

Motion should make the experience feel alive, not slow it down.

Use a consistent motion language: - Smooth envelope-opening
transition. - Gentle fade, reveal, and slide animations as sections
enter view. - Staggered text reveals for the couple's names and
important headings. - Delicate floating or drifting decorative
elements. - Subtle parallax only where it improves the experience. -
Thoughtful hover, focus, and tap feedback. - Small celebratory motion
for meaningful interactions.

Technical requirements: - Prefer CSS animations and transitions for
simple effects. - Use the animation library already installed in the
project if appropriate. Do not add a large dependency for a minor
effect. - Keep animations performant; favor `transform` and `opacity`. -
Avoid animating layout-heavy properties continuously. - Do not hijack
scrolling or make guests wait through long sequences. - Respect
`prefers-reduced-motion` and provide a reduced-motion experience. -
Ensure animations work on touch devices as well as desktop. - Avoid
scroll-jacking, excessive parallax, flashing, and motion that can cause
discomfort.

## 6. Responsive and accessible implementation

The invitation must work beautifully on: - Small mobile phones. - Large
phones. - Tablets. - Desktop and wide screens.

Mobile is the priority because many guests will open the invitation from
messaging apps.

Accessibility requirements: - Use semantic HTML and a logical heading
structure. - Provide useful alt text for meaningful images; use empty
alt text for purely decorative images. - Ensure sufficient color
contrast and readable font sizes. - Make all interactions usable by
keyboard. - Provide visible focus states. - Use buttons for actions and
links for navigation. - Label form fields clearly and provide helpful
validation messages. - Do not communicate meaning through color or
animation alone. - Respect reduced-motion preferences. - Avoid controls
that depend only on hover.

## 7. Content and editable wedding information

Keep wedding content in one clearly organized configuration/data file
rather than scattering it across components.

Use editable placeholders for: - Partner 1 name. - Partner 2 name. -
Wedding date. - Ceremony time. - Reception time. - Venue name. - Venue
address. - Directions / map URL. - Schedule. - RSVP deadline. - RSVP URL
or submission integration. - Contact information. - Photos and
captions. - Personal story milestones. - Easter egg messages.

Use obvious placeholders such as `[PARTNER ONE NAME]` and
`[WEDDING DATE]`. Never fabricate names, dates, locations, family
details, or personal memories.

Format dates and times clearly. Make sure the displayed weekday matches
the actual date once real details are supplied.

## 8. Engineering standards

-   Use reusable components with clear responsibilities.
-   Keep components readable and avoid unnecessary abstraction.
-   Use the project's existing linting, formatting, and TypeScript
    conventions.
-   Avoid `any` in TypeScript unless there is a strong reason and it is
    documented.
-   Keep content separate from presentation.
-   Use responsive images and sensible image sizing.
-   Optimize large images and avoid loading unnecessary assets.
-   Lazy-load below-the-fold media where appropriate.
-   Avoid unnecessary dependencies.
-   Do not add fake buttons, dead links, or interactions that appear
    functional but do nothing.
-   Do not expose secrets or private API keys in client-side code.
-   Keep the browser console free of avoidable errors and warnings.

## 9. Suggested component organization

Adapt this to the existing architecture rather than following it
rigidly.

Potential components: - `InvitationExperience` - `EnvelopeIntro` -
`HeroSection` - `CoupleStory` - `StoryTimeline` - `WeddingDetails` -
`EventSchedule` - `PhotoGallery` - `RSVPSection` - `ClosingSection` -
`EasterEgg` - `FloatingDecorations` - `MusicToggle` (only if music is
actually supplied and desired)

Potential data/config file: - `src/data/wedding.ts` or the equivalent
location used by the project.

Keep Easter egg definitions and wedding details easy to edit.

## 10. Validation before completion

After implementation:

1.  Run the project's available lint, type-check, and build commands.
2.  Fix errors introduced by the changes.
3.  Check the invitation at mobile, tablet, and desktop widths.
4.  Test the envelope/opening interaction.
5.  Test every Easter egg and interactive element.
6.  Test keyboard navigation and visible focus.
7.  Test the reduced-motion experience.
8.  Verify that all wedding details are visible and readable.
9.  Check that all links and buttons have real, appropriate behavior.
10. Check for broken images, layout overflow, and console errors.

If browser automation or a preview tool is available, use it to inspect
the actual rendered experience rather than relying only on code review.

## 11. Working style for the agent

-   Work autonomously on implementation details, but do not invent
    personal or wedding information.
-   Make sensible design decisions instead of asking about every small
    visual choice.
-   Ask concise questions only when a missing detail blocks a meaningful
    decision, such as the couple's names, wedding date, venue, or a
    required RSVP destination.
-   When information is missing, continue using clearly marked
    placeholders.
-   Before major implementation changes, briefly state the approach.
-   Do not stop after creating a static mockup: implement the
    interactions, responsive behavior, and motion.
-   Do not claim a feature works unless it has been implemented and
    tested.

## Definition of done

The project is complete when it is a polished, responsive, accessible,
animated wedding invitation with: - A memorable opening experience. -
Clear wedding information. - A cohesive visual identity. - Several
delightful, discoverable Easter eggs. - Smooth, performant animations. -
Functional links and RSVP behavior where configured. - A working
reduced-motion experience. - No invented wedding facts. - Successful
available checks/build, with any remaining limitations clearly
documented.
