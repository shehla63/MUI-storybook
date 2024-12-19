import { Meta, StoryFn } from "@storybook/react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import withThemeProvider from "./withThemeProvider";
import React from "react";

// Display name for the Accordion component
(Accordion as React.FC).displayName = "Accordion";
(AccordionSummary as React.FC).displayName = "AccordionSummary";
(AccordionDetails as React.FC).displayName = "AccordionDetails";
(Typography as React.FC).displayName = "Typography";

// Storybook meta information
export default {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    expanded: {
      control: "boolean",
      description: "If true, the accordion is expanded.",
    },
    disableGutters: {
      control: "boolean",
      description: "If true, the spacing is removed.",
    },
    square: {
      control: "boolean",
      description: "If true, rounded corners are disabled.",
    },
    disabled: {
      control: "boolean",
      description: "If true, the accordion is disabled.",
    },
    onChange: {
      action: "changed",
      description: "Triggered when the accordion's expanded state changes.",
    },
  },
  decorators: [withThemeProvider],
} as Meta<typeof Accordion>;

// Template for the Accordion component
const Template: StoryFn<typeof Accordion> = (args) => (
  <Accordion
    expanded={args.expanded}
    disableGutters={args.disableGutters}
    square={args.square}
    disabled={args.disabled}
    onChange={(event, expanded) => {
      if (args.onChange) {
        args.onChange(event, expanded);
      }
    }}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1-content"
      id="panel1-header"
    >
      <Typography>Accordion Title</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        This is the content of the accordion. You can put any content here, including text, images, or other components.
      </Typography>
    </AccordionDetails>
  </Accordion>
);

// Default story for the Accordion component
export const Default = Template.bind({});
Default.args = {
  expanded: false,
  disableGutters: false,
  square: false,
  disabled: false,
};

// Story demonstrating expanded state
export const Expanded = Template.bind({});
Expanded.args = {
  expanded: true,
  disableGutters: false,
  square: false,
  disabled: false,
};

// Story demonstrating disabled state
export const Disabled = Template.bind({});
Disabled.args = {
  expanded: false,
  disableGutters: false,
  square: false,
  disabled: true,
};

// Story demonstrating multiple accordions with style overrides
export const StyledAccordions = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {/* First Accordion */}
      <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography>First Accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>This is the content of the first accordion.</Typography>
        </AccordionDetails>
      </Accordion>

      {/* Middle Accordion */}
      <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
          <Typography>Middle Accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>This is the content of the middle accordion.</Typography>
        </AccordionDetails>
      </Accordion>

      {/* Last Accordion */}
      <Accordion expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3-content" id="panel3-header">
          <Typography>Last Accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>This is the content of the last accordion.</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
