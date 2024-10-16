import { Divider } from '@nextui-org/react'
import TimeSet, { ItemProps } from '@/components/TimeSet'
import DeleteReminder from '@/components/DeleteReminder'

const ReminderList = ({ list }: { list: ItemProps[] }) => {
  return (
    <div>
      {list.map((item) => (
        <div className="border-medium border-default-400 rounded-medium p-4 mt-4" key={item.id}>
          <h3 className="flex justify-between items-center capitalize">
            {item.title}
            <DeleteReminder reminderId={item.id} />
          </h3>
          <Divider className="my-2" />
          <p className="text-sm">{item.day} at <TimeSet {...item} /></p>
        </div>
      ))}
    </div>
  )
};

export default ReminderList;
