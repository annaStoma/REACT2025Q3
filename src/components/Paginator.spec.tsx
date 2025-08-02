import { render, screen, fireEvent } from '@testing-library/react';
import Paginator from './Paginator';
import '@testing-library/jest-dom';

describe('Paginator', () => {
  const mockSetCurrentPage = jest.fn();

  beforeEach(() => {
    mockSetCurrentPage.mockClear();
  });

  it('does not render when totalPosts is 0', () => {
    const { container } = render(
      <Paginator
        postsPerPage={10}
        totalPosts={0}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders correct page numbers', () => {
    render(
      <Paginator
        postsPerPage={5}
        totalPosts={50}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );
    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it('calls setCurrentPage when a page number is clicked', () => {
    render(
      <Paginator
        postsPerPage={5}
        totalPosts={50}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    fireEvent.click(screen.getByText('3'));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(3);
  });

  it('disables "First" and "Prev" on first page', () => {
    render(
      <Paginator
        postsPerPage={10}
        totalPosts={100}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    expect(screen.getByText(/First/)).toBeDisabled();
    expect(screen.getByText(/Prev/)).toBeDisabled();
  });

  it('disables "Next" and "Last" on last page', () => {
    render(
      <Paginator
        postsPerPage={10}
        totalPosts={30}
        currentPage={3}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    expect(screen.getByText(/Next/)).toBeDisabled();
    expect(screen.getByText(/Last/)).toBeDisabled();
  });

  it('navigates to first and last pages when buttons are clicked', () => {
    render(
      <Paginator
        postsPerPage={10}
        totalPosts={30}
        currentPage={2}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    fireEvent.click(screen.getByText(/First/));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText(/Last/));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(3);
  });

  it('navigates to next and previous pages correctly', () => {
    render(
      <Paginator
        postsPerPage={10}
        totalPosts={50}
        currentPage={3}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    fireEvent.click(screen.getByText(/Prev/));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText(/Next/));
    expect(mockSetCurrentPage).toHaveBeenCalledWith(4);
  });
});
