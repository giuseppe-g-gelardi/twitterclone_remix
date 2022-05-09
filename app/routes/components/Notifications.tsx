
  type Props = {
    to: any; 
    from: any; 
    message: any; 
    link: any; 
    type: any; 
  }

export default function Notifications(props: Props) {
  const { to, from, message, link, type } = props
  return (
    <div>
      {message}
    </div>
  )
}
    // notification = {
      // to: "620eaf7c23102c0148a49cc2"
      // from: "620eaf8323102c0148a49cc5"
      // message: "nebby liked your comment!"
      // link: "62791d8d2e8412d9cecac5cb"
      // notificationType: "comment_like"
    // }
