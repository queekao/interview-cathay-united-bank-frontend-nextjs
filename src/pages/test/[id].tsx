import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/test.module.scss'

/**
  There is an array, each item has such format:
  {firstName: 'xxx', lastName: 'xxx', customerID: 'xxx', note: 'xxx',
  profession: ‘xxx’}
  ⭐️ lastName, note can be empty, customerID can only be a set of digital
  numbers.
  profession can only have ‘student’, ‘freelancer’, ‘productOwner’,
  ‘engineer’ or ‘systemAnalytics’.
**/
type Profession =
  | 'student'
  | 'freelancer'
  | 'productOwner'
  | 'engineer'
  | 'systemAnalytics'

interface User {
  firstName: string
  lastName?: string
  customerID: number
  note?: string
  profession: Profession
}
const mockUsers: User[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    customerID: 1001,
    profession: 'systemAnalytics'
  },
  {
    firstName: 'Jane',
    customerID: 1002,
    note: 'Prefers email contact',
    profession: 'engineer'
  },
  {
    firstName: 'Emily',
    lastName: 'Smith',
    customerID: 1003,
    profession: 'productOwner'
  },
  {
    firstName: 'Robert',
    lastName: 'Brown',
    customerID: 1004,
    profession: 'freelancer'
  },
  {
    firstName: 'Michael',
    customerID: 1005,
    profession: 'student'
  },
  {
    firstName: 'Jessica',
    lastName: 'Johnson',
    customerID: 1006,
    profession: 'engineer'
  },
  {
    firstName: 'Sarah',
    customerID: 1007,
    note: 'VIP customer',
    profession: 'productOwner'
  },
  {
    firstName: 'Thomas',
    lastName: 'Clark',
    customerID: 1008,
    profession: 'freelancer'
  },
  {
    firstName: 'Lisa',
    customerID: 1009,
    profession: 'student'
  },
  {
    firstName: 'James',
    lastName: 'Lewis',
    customerID: 1010,
    note: 'Contact via phone',
    profession: 'systemAnalytics'
  }
]

export default function TestPage(): ReactElement {
  const router = useRouter()
  const { id } = router.query
  /**
    Q1.1 Please follow the principle (‘firstName’ + ‘lastName’ + ‘customerID’)
    to sort this array and print it out.
  **/
  function sortUserName(users: User[]) {
    return users
      .sort((a, b) => a.customerID - b.customerID)
      .map(user => {
        return `${user.firstName} ${user?.lastName || ''} ${user?.customerID}`
      })
  }
  /**
    Q1.2 Please sort by ‘profession’ to follow the principle.
    (‘systemAnalytics’ > ‘engineer’ > ‘productOwner’ > ‘freelancer’ >
    ‘student’’)
  **/
  const professionPriority = {
    systemAnalytics: 1,
    engineer: 2,
    productOwner: 3,
    freelancer: 4,
    student: 5
  }
  function sortByType(users: User[]) {
    return users.sort((a, b) => {
      return professionPriority[a.profession] - professionPriority[b.profession]
    })
  }
  /**
    Q3. let items = [1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 3, 7, 8, 5, 4, 9, 0, 1,
    3, 2, 6, 7, 5, 4, 4, 7, 8, 8, 0, 1, 2, 3, 1];
    Please write down a function to console log unique value from this array.
  **/
  let items = [
    1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 3, 7, 8, 5, 4, 9, 0, 1, 3, 2, 6, 7, 5,
    4, 4, 7, 8, 8, 0, 1, 2, 3, 1
  ]
  function getUniqueNumber(items: Array<number>) {
    // Time Complexity: O(n), Space Comlexity: O(n)
    const aggregatingNums = new Map()
    items.forEach(item => {
      if (aggregatingNums.has(item)) {
        aggregatingNums.set(item, false)
      } else {
        aggregatingNums.set(item, true)
      }
    })
    const uniqueValues = [...aggregatingNums.entries()]
      .filter(([_, value]) => value === true)
      .map(([key, _]) => key)

    console.log(uniqueValues)
    return uniqueValues
  }
  /** 
    Q4.

    Q:Can you explain about Interface and Enum, and where will you be using,
    please make some examples.
    A: 
       1.Enum is using for defining the variable of value  
         1.1 For the frontend, you can define a object of key contain multiple value
           that you can only utilize this value for certain use cases
         1.2 For the database, you can define a gender key that contains 
           the value of "MALE" or "FEMALE", which means you can only implement
           this key with "MALE" or "FEMALE"
       2.Interface is using for defining the class of types in typescript
         2.1 It is often using as a object of multiple type that you can extend it
           with other interface, Or 
             2.1.1 you can "Partial" select the type
             2.1.2 you can "Omit" the type you don't want to use
             2.1.3 you can "Pick" the type you want to use
  **/

  /**
    Q5. Can you explain the problem with the following code, and how to fix it.
    class Count extends React.Component {
      constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.handleAddCount = this.handleAddCount.bind(this);
      }
      handleAddCount(){
        this.setState({ count: this.state.count + 1 });
        this.setState({ count: this.state.count + 1 });
        this.setState({ count: this.state.count + 1 });
      }
      render() {
        return (
          <div>
          <h2>{this.state.count}</h2>
          <button onClick={this.handleAddCount}>Add</button>
          </div>
        );
        }
      }

      ReactDOM.render(
        <Count />,
        document.getElementById('root')
      );
    ////
    A: You shouldn't call "this.setState" three time in the "handleAddCount" 
       it will only evaluate once which means plus 1 whenever you click the button
  **/
  /** 
  Q6. Please write the sample code to debounce handleOnChange 
      function debounce(func, wait) {
        let timeout;

        return function executedFunction(...args) {
          const delay = () => {
            clearTimeout(timeout);
            func(...args);
          };

          // reset timeout
          clearTimeout(timeout);
          timeout = setTimeout(delay, wait);
        };
      };

      var SearchBox = React.createClass({
        render: function () {
          return <input type="search" name="p" onChange={this.handleOnChange} />
        },
        handleOnChange: debounce(function (event) {
          console.log(event.target.value); 
        }, 300),
      })
    **/
  return (
    <div>
      <h1>Test 1.1</h1>
      {sortUserName(mockUsers).map(user => (
        <p key={user}>{user}</p>
      ))}
      <p>////////////////////////////////////</p>
      <h1>Test 1.2</h1>
      {sortByType(mockUsers).map(user => (
        <p key={user.customerID}>{user.firstName}</p>
      ))}
      <p>////////////////////////////////////</p>
      <h3>test 2</h3>
      {/* I have written the answer in the styles directory, inside the test.module.scss file. */}
      <div className={styles.container}>
        <div className={styles.header}>5/8 外出確認表</div>
        <div className={styles.content}>
          <ol className={styles['shop-list']}>
            <li className={styles.item}>麵包</li>
            <li className={styles.item}>短袖衣服</li>
            <li className={styles.item}>飲用水</li>
            <li className={styles.item}>帳篷</li>
          </ol>
          <ul className={styles['shop-list']}>
            <li className={styles.item}>暈車藥</li>
            <li className={styles.item}>感冒藥</li>
            <li className={styles.item}>丹木斯</li>
            <li className={styles.item}>咳嗽糖漿</li>
          </ul>
        </div>
        <div className={styles.footer}>以上僅共參考</div>
      </div>
      <p>////////////////////////////////////</p>
      <h3>test 3</h3>
      <p>Unique Value:{getUniqueNumber(items)}</p>
    </div>
  )
}
