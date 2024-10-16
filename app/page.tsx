import { getCurrentUser } from '@/utils/users'
import Shell from '@/components/Shell'
import AddReminder from '@/components/AddReminder'
import ReminderList from '@/components/ReminderList'
import { getAllReminders } from '@/utils/remindersTools'
import { Divider } from "@nextui-org/react";

const Home = async () => {
  const user = await getCurrentUser()
  const reminders = await getAllReminders(user.id)

  return (
    <Shell>
      <div className="flex w-full h-full justify-center flex-col max-w-[400px] m-auto">
        <h1 className="mb-8 text-center text-lg">Welcome, {user.email}!</h1>
        <AddReminder userId={user.id} />
        {reminders.length > 0 && (
          <>
            <Divider className="my-6" />
            <h2 className="text-lg text-center">Your Reminders</h2>
            <ReminderList list={reminders} />
          </>
        )}  
      </div>
    </Shell>
  )
}

export default Home
