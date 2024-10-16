import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import TimeSet from '../TimeSet'
import { updateThisReminder } from '@/actions/reminders';

jest.mock('@/actions/reminders', () => ({
  updateThisReminder: jest.fn(),
}));
 
describe('Time Block', () => {
   beforeEach(() => {
    const mockedDate = new Date(1999, 10, 1);

    jest.useFakeTimers();
    jest.setSystemTime(mockedDate);
    jest.spyOn(global, 'setTimeout').mockImplementation((cb => cb() as any));
    jest.spyOn(global, 'alert').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('render a time block', () => {
    render(<TimeSet
      id="123"    
      day="Monday" 
      time="22:01:00" 
      title="Test call"
      createdAt={new Date("1999-09-01T14:37:37.942Z")}
      ackedAt={new Date("1999-09-01T14:37:37.942Z")}
    />);

    const time = screen.getByRole('time');
    const { getByText } = within(time)
 
    expect(time).toBeInTheDocument();
    expect(getByText('22:01')).toBeInTheDocument();
  })

  it('should set up reminder, if day is today', () => {
    render(<TimeSet
      id="123"    
      day="Monday" 
      time="22:01:00" 
      title="Test call"
      createdAt={new Date("1999-09-01T14:37:37.942Z")}
      ackedAt={new Date("1999-09-01T14:37:37.942Z")}
    />);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 79260000);
  });

  it('should call alert with title and time', () => {
    render(<TimeSet
      id="123"    
      day="Monday" 
      time="19:01:00" 
      title="Test call"
      createdAt={new Date("1999-09-01T14:37:37.942Z")}
      ackedAt={new Date("1999-09-01T14:37:37.942Z")}
    />);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 68460000);

    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenLastCalledWith('Reminder for Test call at 19:01 is due');

    expect(updateThisReminder).toHaveBeenCalledTimes(1);
    expect(updateThisReminder).toHaveBeenLastCalledWith('123');
  });

  it('should not set up reminder, if day is not today', () => {
    render(<TimeSet
      id="123"    
      day="Wednesday" 
      time="20:01:00" 
      title="Test call"
      createdAt={new Date("1999-09-01T14:37:37.942Z")}
      ackedAt={new Date("1999-09-01T14:37:37.942Z")}
    />);

    expect(setTimeout).not.toHaveBeenCalled();
    expect(alert).not.toHaveBeenCalled();
    expect(updateThisReminder).not.toHaveBeenCalled();
  });

  it('should not set up reminder, if reminder is acknowledged', () => {
    render(<TimeSet
      id="123"    
      day="Monday" 
      time="20:01:00" 
      title="Test call"
      createdAt={new Date("1999-09-01T14:37:37.942Z")}
      ackedAt={new Date("1999-11-01T20:02:37.942Z")}
    />);

    expect(setTimeout).not.toHaveBeenCalled();
    expect(alert).not.toHaveBeenCalled();
    expect(updateThisReminder).not.toHaveBeenCalled();
  });
})