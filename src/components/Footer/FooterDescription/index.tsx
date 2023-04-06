import { CATEGORIES, MENU, OURCOMPANY } from '../../../constants/common'

import styles from '../Footer.module.css'

const FooterDescription = () => {
  const { description, title, title_item, list_item } = styles
  return (
    <div className={description}>
      <div className={list_item}>
        <h2 className={title}>Menu</h2>
        {MENU.map((i) => (
          <p className={title_item} key={i}>
            {i}
          </p>
        ))}
      </div>
      <div className={list_item}>
        <h2 className={title}>Categories</h2>
        {CATEGORIES.map((i) => (
          <p className={title_item} key={i}>
            {i}
          </p>
        ))}
      </div>
      <div className={list_item}>
        <h2 className={title}>Our company</h2>
        {OURCOMPANY.map((i) => (
          <p className={title_item} key={i}>
            {i}
          </p>
        ))}
      </div>
    </div>
  )
}

export default FooterDescription
