import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DoctorNavbar from "./DoctorNavbar";

function renderDoctorNavbar() {
  return render(
    <MemoryRouter>
      <DoctorNavbar />
    </MemoryRouter>
  );
}

describe("DoctorNavbar Component", () => {
  test("renders the navigation bar", () => {
    renderDoctorNavbar();

    const navbar = screen.getByRole("navigation");

    expect(navbar).toBeInTheDocument();
  });

  test("renders the DermaCure AI logo", () => {
    renderDoctorNavbar();

    expect(screen.getByText(/DermaCure/i)).toBeInTheDocument();
    expect(screen.getByText(/AI/i)).toBeInTheDocument();
  });

  test("renders the Dashboard link", () => {
    renderDoctorNavbar();

    const dashboard = screen.getByRole("link", {
      name: "Dashboard",
    });

    expect(dashboard).toBeInTheDocument();
    expect(dashboard).toHaveAttribute(
      "href",
      "/doctor/dashboard"
    );
  });

  test("renders the Patients link", () => {
    renderDoctorNavbar();

    const patients = screen.getByRole("link", {
      name: "Patients",
    });

    expect(patients).toBeInTheDocument();
    expect(patients).toHaveAttribute(
      "href",
      "/doctor/patients"
    );
  });

  test("renders the Appointments link", () => {
    renderDoctorNavbar();

    const appointments = screen.getByRole("link", {
      name: "Appointments",
    });

    expect(appointments).toBeInTheDocument();
    expect(appointments).toHaveAttribute(
      "href",
      "/doctor/appointments"
    );
  });

  test("renders the Cases link", () => {
    renderDoctorNavbar();

    const cases = screen.getByRole("link", {
      name: "Cases",
    });

    expect(cases).toBeInTheDocument();
    expect(cases).toHaveAttribute(
      "href",
      "/doctor/cases"
    );
  });

  test("renders the Profile link", () => {
    renderDoctorNavbar();

    const profile = screen.getByRole("link", {
      name: "Profile",
    });

    expect(profile).toBeInTheDocument();
    expect(profile).toHaveAttribute(
      "href",
      "/doctor/profile"
    );
  });

  test("renders the Logout link", () => {
    renderDoctorNavbar();

    const logout = screen.getByRole("link", {
      name: "Logout",
    });

    expect(logout).toBeInTheDocument();
    expect(logout).toHaveAttribute(
      "href",
      "/login"
    );
  });

  test("renders exactly six navigation links", () => {
    renderDoctorNavbar();

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(6);
  });
});