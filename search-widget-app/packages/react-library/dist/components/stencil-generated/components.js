'use client';
import { createComponent } from '@stencil/react-output-target/runtime';
import React from 'react';
import { SearchComponent as SearchComponentElement, defineCustomElement as defineSearchComponent } from "../../../../stencil-library/dist/components/search-component.js";
export const SearchComponent = createComponent({
    tagName: 'search-component',
    elementClass: SearchComponentElement,
    react: React,
    events: {},
    defineCustomElement: defineSearchComponent
});
//# sourceMappingURL=components.js.map