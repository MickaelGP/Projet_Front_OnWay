import styles from '@/ui/Footer/page.module.css'
export default function FooterUtilisateurs(){
    return(
        <footer className={`d-flex flex-column align-items-center gap-3 ${styles.footerColor}`}>
            <div className="my-3 p-3">
                <span className="mx-3"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                            viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M18.517 4.903c-1.271-1.12-2.966-1.074-4.423-.526c-1.155.435-1.891 1.19-2.32 2.113c-.306.661-.446 1.389-.498 2.112C8.9 8.459 6.811 7.276 5.411 5.31a.75.75 0 0 0-.652-.313c-.307.016-.532.22-.666.481q-.046.088-.12.246a10 10 0 0 0-.354.875c-.255.73-.519 1.756-.53 2.904c-.012 1.154.233 2.446 1.007 3.676c.599.95 1.494 1.832 2.769 2.578c-1.227.672-2.447 1.052-3.836.998a.75.75 0 0 0-.39 1.407c3.105 1.7 6.555 2.323 9.602 1.435c4.96-1.449 7.853-6.09 7.873-11.001q.044-.1.137-.285q.105-.211.238-.467q.12-.23.258-.504c.364-.719.818-1.65.981-2.31a.75.75 0 0 0-1.06-.853c-.612.302-1.193.462-1.859.645z"/></svg></span>
                <span className="mx-3"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                            viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M14.5 2.75c-2.861 0-5.25 2.389-5.25 5.25v1.75H6.5a.25.25 0 0 0-.25.25v4c0 .138.112.25.25.25h2.75V21c0 .138.112.25.25.25h4a.25.25 0 0 0 .25-.25v-6.75h2.75a.25.25 0 0 0 .242-.19l1-4a.25.25 0 0 0-.242-.31h-3.75V8a.76.76 0 0 1 .75-.75h3a.25.25 0 0 0 .25-.25V3a.25.25 0 0 0-.25-.25z"/></svg></span>
                <span className="mx-3"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                            viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                       strokeWidth="1.5"><path
                        d="M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6zm14-2.9h.5"/><path
                        d="M15.462 11.487a3.5 3.5 0 1 1-6.925 1.026a3.5 3.5 0 0 1 6.925-1.026"/></g></svg></span>
            </div>
            <div className="my-5 p-3 text-center">
                <p>Mention légale</p>
                <p>Politique de confidentialité</p>
                <a href="#">test@test.fr</a>
            </div>
        </footer>
    );
}