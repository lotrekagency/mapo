function setScrollbarTrackColor(dark) {
    document
        ?.querySelector(":root")
        .style.setProperty(
            "--v-scrollbar-track-color",
            dark ? "#1E1E1E" : "#f5f5f5"
        );
}

export {
    setScrollbarTrackColor,
};
