interface GithubUserProps {
  id: number;
  name: string;
  image: string;
}

export default function GithubUser(props: GithubUserProps) {
  return (
    <div>
      <img src={props.image} alt="user avatar" width="40" height="40" />
      <h2>{props.name}</h2>
      <p>{props.id}</p>
    </div>
  )
}
