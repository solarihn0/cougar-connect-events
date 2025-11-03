import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import TicketIcon from '../TicketIcon';

/**
 * TDD Example 4: Component Testing
 * 
 * Testing Strategy:
 * - Test component rendering for different props
 * - Verify correct icon display based on event category
 * - Test status color application
 */

describe('TicketIcon Component', () => {
  describe('Max Capacity (GA) Tickets', () => {
    it('should render GA badge for Max Capacity events', () => {
      const { container } = render(
        <TicketIcon
          eventCategory="Max Capacity"
          status="purchased"
          quantity={2}
        />
      );

      expect(container.textContent).toContain('x2 GA');
    });

    it('should apply purchased status color', () => {
      const { container } = render(
        <TicketIcon
          eventCategory="Max Capacity"
          status="purchased"
          quantity={1}
        />
      );

      const iconWrapper = container.querySelector('.text-green-500');
      expect(iconWrapper).toBeInTheDocument();
    });

    it('should apply selected status color', () => {
      const { container } = render(
        <TicketIcon
          eventCategory="Max Capacity"
          status="selected"
          quantity={3}
        />
      );

      const iconWrapper = container.querySelector('.text-yellow-400');
      expect(iconWrapper).toBeInTheDocument();
    });

    it('should apply refunded status color', () => {
      const { container } = render(
        <TicketIcon
          eventCategory="Max Capacity"
          status="refunded"
          quantity={1}
        />
      );

      const iconWrapper = container.querySelector('.text-muted');
      expect(iconWrapper).toBeInTheDocument();
    });
  });

  describe('Assigned Seating Tickets', () => {
    it('should render seat details for Big Arena events', () => {
      const { container } = render(
        <TicketIcon
          eventCategory="Big Arena"
          status="purchased"
          section="205"
          row="F"
          seat="12"
        />
      );

      expect(container.textContent).toContain('205 • F • 12');
    });

    it('should render seat details for Selected Seats events', () => {
      const { container } = render(
        <TicketIcon
          eventCategory="Selected Seats"
          status="purchased"
          section="A"
          row="10"
          seat="5"
        />
      );

      expect(container.textContent).toContain('A • 10 • 5');
    });

    it('should not render seat details when missing section/row/seat', () => {
      const { container } = render(
        <TicketIcon
          eventCategory="Big Arena"
          status="purchased"
        />
      );

      expect(container.textContent).not.toContain('•');
    });
  });

  describe('Size Variants', () => {
    it('should render small size correctly', () => {
      const { container } = render(
        <TicketIcon
          eventCategory="Big Arena"
          status="purchased"
          section="101"
          row="A"
          seat="1"
          size="sm"
        />
      );

      const iconWrapper = container.querySelector('.w-8');
      expect(iconWrapper).toBeInTheDocument();
    });

    it('should render medium size by default', () => {
      const { container } = render(
        <TicketIcon
          eventCategory="Big Arena"
          status="purchased"
          section="101"
          row="A"
          seat="1"
        />
      );

      const iconWrapper = container.querySelector('.w-12');
      expect(iconWrapper).toBeInTheDocument();
    });

    it('should render large size correctly', () => {
      const { container } = render(
        <TicketIcon
          eventCategory="Big Arena"
          status="purchased"
          section="101"
          row="A"
          seat="1"
          size="lg"
        />
      );

      const iconWrapper = container.querySelector('.w-16');
      expect(iconWrapper).toBeInTheDocument();
    });
  });
});
