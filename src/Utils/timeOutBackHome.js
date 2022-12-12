export const timeOut = (setOpen, openNotification, des, navigate) => {
    setTimeout(async () => {
        setOpen(false);
        openNotification('topRight', des)
        setTimeout(() => {
            navigate('/home')
        }, 3000)
    }, 1000);
}