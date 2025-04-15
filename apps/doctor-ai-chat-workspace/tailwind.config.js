const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const { createSurfaces } = require('@acorex/styles/generators/index.js');
const { createOnSurfaces } = require('@acorex/styles/generators/index.js');
const { createBorderSurfaces } = require('@acorex/styles/generators/index.js');


/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@acorex/styles/tailwind-base')],
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    join(
      __dirname,
      '../../node_modules/@acorex/**/!(*.stories|*.spec).{ts,html,mjs}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  safelist:[
    ...generateResponsiveGridClasses('ax-col-start-', 12),
    ...generateResponsiveGridClasses('ax-col-end-', 12),
    ...generateResponsiveGridClasses('ax-col-span-', 12),
    ...generateResponsiveGridClasses('ax-row-start-', 12),
    ...generateResponsiveGridClasses('ax-row-end-', 12),
    ...generateResponsiveGridClasses('ax-row-span-', 12),
    ...generateResponsiveGridClasses('ax-grid-cols-', 12),
    ...generateResponsiveGridClasses('ax-grid-rows-', 12),
    ...generateResponsiveGridClasses('ax-order-', 12),  // Add order classes
    ...generateRangeClasses('ax-gap-',12),
    ...generateResponsiveUtilityClasses('ax-order-last','ax-order-first','ax-order-none','ax-justify-between')
    
  ],
  theme: {
    extend: {
      colors: {
        accent1: createSurfaces('accent1'),
      },
      backgroundColor: {
        accent1: createSurfaces('accent1'),
      },
      textColor: {
        accent1: createOnSurfaces('accent1'),
      },
      borderColor: {
        accent1: createBorderSurfaces('accent1'),
      }
    },
  },
  plugins: [],
};
function generateResponsiveGridClasses(base, max) {
  const breakpoints = ['','sm', 'md', 'lg', 'xl', '2xl'];
  let classes = [];
  for (const breakpoint of breakpoints) {
    classes = classes.concat(Array.from({ length: max }, (_, i) => breakpoint!=''? `${breakpoint}:${base}${i + 1}`: `${base}${i + 1}`));
  }
  return classes;
}


function generateResponsiveUtilityClasses(...classes) {
  const breakpoints = ['','sm', 'md', 'lg', 'xl', '2xl'];
  const generatedClasses = [];
  classes.forEach(cls => {
    breakpoints.forEach(breakpoint => {
      generatedClasses.push(breakpoint ? `${breakpoint}:${cls}` : cls);
    });
  });
  return generatedClasses;
}

function generateRangeClasses(base, max) {
  const classes = Array.from({ length: max+1  }, (_, i) =>  `${base}${i}`);
  return classes;
}