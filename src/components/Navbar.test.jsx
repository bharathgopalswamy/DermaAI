import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import Navbar from "./Navbar";

/*
  Navbar uses React Router's <Link> component.

  Therefore, Navbar must be rendered inside MemoryRouter
  during testing.
*/
function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
}

describe("Navbar component", () => {
  test("renders the navigation bar", () => {
    renderNavbar();

    const navbar = screen.getByRole("navigation");

    expect(navbar).toBeInTheDocument();
  });

  test("renders the DermaCure AI logo", () => {
    renderNavbar();

    const navbar = screen.getByRole("navigation");

    expect(navbar).toHaveTextContent("DermaCure AI");
  });

  test("renders the Dashboard link", () => {
    renderNavbar();

    const dashboardLink = screen.getByRole("link", {
      name: "Dashboard",
    });

    expect(dashboardLink).toBeInTheDocument();
  });

  test("Dashboard link points to the dashboard page", () => {
    renderNavbar();

    const dashboardLink = screen.getByRole("link", {
      name: "Dashboard",
    });

    expect(dashboardLink).toHaveAttribute("href", "/dashboard");
  });

  test("renders the Scan Skin link", () => {
    renderNavbar();

    const scanLink = screen.getByRole("link", {
      name: "Scan Skin",
    });

    expect(scanLink).toBeInTheDocument();
  });

  test("Scan Skin link points to the scan page", () => {
    renderNavbar();

    const scanLink = screen.getByRole("link", {
      name: "Scan Skin",
    });

    expect(scanLink).toHaveAttribute("href", "/scan");
  });

  test("renders the Doctors link", () => {
    renderNavbar();

    const doctorsLink = screen.getByRole("link", {
      name: "Doctors",
    });

    expect(doctorsLink).toBeInTheDocument();
  });

  test("Doctors link points to the doctors page", () => {
    renderNavbar();

    const doctorsLink = screen.getByRole("link", {
      name: "Doctors",
    });

    expect(doctorsLink).toHaveAttribute("href", "/doctors");
  });

  test("renders the Appointments link", () => {
    renderNavbar();

    const appointmentsLink = screen.getByRole("link", {
      name: "Appointments",
    });

    expect(appointmentsLink).toBeInTheDocument();
  });

  test("Appointments link points to the appointments page", () => {
    renderNavbar();

    const appointmentsLink = screen.getByRole("link", {
      name: "Appointments",
    });

    expect(appointmentsLink).toHaveAttribute(
      "href",
      "/appointments"
    );
  });

  test("renders the Logout link", () => {
    renderNavbar();

    const logoutLink = screen.getByRole("link", {
      name: "Logout",
    });

    expect(logoutLink).toBeInTheDocument();
  });

  test("Logout link points to the login page", () => {
    renderNavbar();

    const logoutLink = screen.getByRole("link", {
      name: "Logout",
    });

    expect(logoutLink).toHaveAttribute("href", "/login");
  });

  test("renders exactly five navigation links", () => {
    renderNavbar();

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(5);
  });
});