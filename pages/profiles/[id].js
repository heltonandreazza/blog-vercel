import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Profile({ profileData }) {
  console.log('props', profileData)
  return (
    <Layout>
      <Head>
        <title>{profileData.name}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{profileData.name}</h1>
        <div className={utilStyles.lightText}>
          {profileData.bod && <Date dateString={profileData.bod} />}
        </div>
        <p>{profileData.id}</p>
        <p>{profileData.name}</p>
        <p>{profileData.responsable}</p>
        <p>{profileData.objective}</p>
        <p>{profileData.frequency}</p>
        <p>{profileData.sub}</p>
        <p>{profileData.situation}</p>
        <p>{profileData.sex}</p>
        <p>{profileData.bod}</p>
        <p>{profileData.firstCpf}</p>
      </article>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  // const eita = {...context}
  const { id } = context?.params
  const response = await fetch(`https://opohlreev5.execute-api.sa-east-1.amazonaws.com/prod/ac-profile/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      "id": id,
      "key": "c75af2f5-0fab-4fc0-8f54-2bd355bbe27a"
    })
  })
  
  const profileData = await response.json()

  return {
    props: {
      params: context.params,
      profileData
    }, // will be passed to the page component as props
  }
}
